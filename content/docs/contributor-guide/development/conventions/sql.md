+++
title = "SQL 规范"
description = "SQL 规范"
weight = 4
+++

# SQL 规范
---

## 建表规约

#### 强制要求

1. 表达是与否概念的字段，必须使用 `is_xxx` 的方式命名，数据类型是 `unsigned tinyint` （`1` 表示是， `0` 表示否）。
    * 说明：任何字段如果为非负数，必须是 `unsigned`。

    |正例|
    |---|
    |表达逻辑删除的字段名 `is_deleted`， 1 表示删除， 0 表示未删除|
1. 表名、字段名必须使用小写字母或数字，禁止出现数字开头，禁止两个下划线中间只出现数字。
    {{< warning >}}数据库字段名的修改代价很大，因为无法进行预发布，所以字段名称需要慎重考虑。{{</ warning >}}
     * 说明：MySQL 在 Windows 下不区分大小写，但在 Linux 下默认是区分大小写。因此，数据库名、表名、字段名，都不允许出现任何大写字母，避免节外生枝。

    |正例|反例|
    |---|---|
    |choerodon_admin， level3_name|choerodonAdmin，level_3_name|
1. 表名不使用复数名词。
    * 说明： 表名应该仅仅表示表里面的实体内容，不应该表示实体数量，对应于 DO 类名也是单数形式，符合表达习惯。
1. 禁用保留字，如 `desc`、 `range`、 `match`、 `delayed` 等， 请参考 MySQL 官方保留字。
1. 主键索引名为 `pk_字段名`； 唯一索引名为 `uk_字段名`； 普通索引名则为 `idx_字段名`。
    * 说明： pk_ 即 primary key； uk_ 即 unique key； idx_ 即 index 的简称。
1. 小数类型为 `decimal`，禁止使用 float 和 double。
    * 说明： float 和 double 在存储的时候，存在精度损失的问题，很可能在值的比较时，得到不正确的结果。如果存储的数据范围超过 decimal 的范围，建议将数据拆成整数和小数分开存储。
1. 如果存储的字符串长度几乎相等，使用 char 定义长字符串类型。
1. varchar 是可变长字符串，不预先分配存储空间，长度不要超过5000，如果存储长度大于此值，定义字段类型为 text，独立出来一张表，用主键来对应，避免影响其它字段索引效率。
    * 说明： 该表的命名以 `原表名_字段缩写` 的格式命名。
1. 表必备字段： `id`, `create_date`, `last_update_date`, `create_by` , `last_update_by` , `object_version_number`。
    * 说明： 其中 id 必为主键，类型为 unsigned bigint、单表时自增、步长为 1。
    * `create_date`, `last_update_date` 的类型均为 datetime 类型，前者现在时表示主动创建，后者过去分词表示被动更新。

    ```
    column(name: "object_version_number", type: "BIGINT UNSIGNED", defaultValue: "1")
    column(name: "created_by", type: "BIGINT UNSIGNED", defaultValue: "0")
    column(name: "creation_date", type: "DATETIME", defaultValueComputed: "CURRENT_TIMESTAMP")
    column(name: "last_updated_by", type: "BIGINT UNSIGNED", defaultValue: "0")
    column(name: "last_update_date", type: "DATETIME", defaultValueComputed: "CURRENT_TIMESTAMP")
    ```

1. 表的命名最好是加上“业务名称_表的作用”。

    |正例|
    |---|
    |`kanban_task` / `devops_project` / `website_config`|

#### 推荐规约

1. 库名与应用名称尽量一致。
1. 如果修改字段含义或对字段表示的状态追加时，需要及时更新字段注释。
1. 字段允许适当冗余，以提高查询性能，但必须考虑数据一致。冗余字段应遵循：
    - 不是频繁修改的字段。
    - 不是 `varchar` 超长字段，更不能是 `text` 字段。

    |正例|
    |---|
    |商品类目名称使用频率高， 字段长度短，名称基本一成不变， 可在相关联的表中冗余存储类目名称，避免关联查询。|
1. 单表行数超过 500 万行或者单表容量超过 2GB，才推荐进行分库分表。
    * 说明： 如果预计三年后的数据量根本达不到这个级别，请不要在创建表时就分库分表。

#### 规约参考

1. 合适的字符存储长度，不但节约数据库表空间、节约索引存储，更重要的是提升检索速度。
    * 正例： 如下表，其中无符号值可以避免误存负数，且扩大了表示范围。

    |对象|年龄区间|类型|字节|表示范围|
    |----|--------|----|----|--------|
    |人|150岁之内|`unsigned tinyint`|1|无符号值： 0 到 255|
    |龟|数百岁|`unsigned smallint`|2|无符号值： 0 到 65535|
    |恐龙化石|数千万年|`unsigned int`|4|无符号值： 0 到约 42.9 亿|
    |太阳|约 50 亿年|`unsigned bigint`|8|无符号值： 0 到约 10 的 19 次方|

## 索引规约

#### 强制要求

1. 业务上具有唯一特性的字段，即使是多个字段的组合，也必须建成唯一索引。
    * 说明：不要以为唯一索引影响了insert速度，这个速度损耗可以忽略，但提高查找速度是明显的；另外，即使在应用层做了非常完善的校验控制，只要没有唯一索引，根据墨菲定律，必然有脏数据产生。
1. 超过三个表禁止join。需要join的字段，数据类型必须绝对一致；多表关联查询时，保证被关联的字段需要有索引。
    {{< note >}}即使双表join也要注意表索引、SQL性能。{{</ note >}}
1. 在varchar字段上建立索引时，必须指定索引长度，没必要对全字段建立索引，根据实际文本区分度决定索引长度即可。
    * 说明：索引的长度与区分度是一对矛盾体，一般对字符串类型数据，长度为 20 的索引，区分度会高达90%以上，可以使用 count(distinct left(列名,索引长度))/count(*)的区分度来确定。
1. 页面搜索严禁左模糊或者全模糊，如果需要请走搜索引擎来解决。
    * 说明：索引文件具有B-Tree的最左前缀匹配特性，如果左边的值未确定，那么无法使用此索引。

#### 推荐规约

1. 如果有`order by`的场景，请注意利用索引的有序性。`order by` 最后的字段是组合索引的一部分，并且放在索引组合顺序的最后，避免出现file_sort的情况，影响查询性能。

    |正例|反例|
    |---|---|
    |where a=? and b=? order by c; 索引： a_b_c|索引中有范围查找，那么索引有序性无法利用，如： WHERE a>10 ORDER BY b; 索引a_b无法排序。|
1. 利用覆盖索引来进行查询操作， 避免回表。
    * 说明：如果一本书需要知道第 11 章是什么标题，会翻开第 11章对应的那一页吗？目录浏览一下就好，这个目录就是起到覆盖索引的作用。

    |正例|
    |---|
    |能够建立索引的种类分为主键索引、唯一索引、普通索引三种，而覆盖索引只是一种查询的一种效果，用explain 的结果，extra 列会出现： using index。|
1. 利用延迟关联或者子查询优化超多分页场景。
    * 说明：MySQL 并不是跳过 offset 行，而是取 offset+N 行，然后返回放弃前offset行，返回N行，那当 offset 特别大的时候，效率就非常的低下，要么控制返回的总页数，要么对超过特定阈值的页数进行SQL改写。
    * 正例：先快速定位需要获取的 id 段，然后再关联：

        ```
        SELECT a.* FROM 表 1 a, (select id from 表 1 where 条件 LIMIT 100000,20 ) b where a.id=b.id
        ```
1.  SQL 性能优化的目标：至少要达到 range 级别，要求是ref级别，如果可以是consts最好。
    * 说明：
        1. consts 单表中最多只有一个匹配行（主键或者唯一索引），在优化阶段即可读取到数据。
        1. ref 指的是使用普通的索引（`normal index`） 。
        1. range 对索引进行范围检索。
    |反例|
    |---|
    |explain 表的结果， type=index，索引物理文件全扫描，速度非常慢，这个 index 级别比较 range 还低，与全表扫描是小巫见大巫。|
1. 建组合索引的时候，区分度最高的在最左边。
    * 说明： 存在非等号和等号混合判断条件时，在建索引时，请把等号条件的列前置。如： where a>? and b=? 那么即使 a 的区分度更高，也必须把 b 放在索引的最前列。

    |正例|
    |---|
    |如果 where a=? and b=? ， a列的几乎接近于唯一值，那么只需要单建 idx_a 索引即可。|
1.  防止因字段类型不同造成的隐式转换，导致索引失效。

#### 规约参考

1. 创建索引时避免有如下极端误解：
    - 认为一个查询就需要建一个索引。
    - 认为索引会消耗空间、严重拖慢更新和新增速度。
    - 抵制惟一索引。认为业务的惟一性一律需要在应用层通过“先查后插”方式解决。

## SQL 语句

#### 强制要求

1. 不要使用 count(列名)或 count(常量)来替代 `count(\*)`， count(*)是 SQL92 定义的标准统计行数的语法，跟数据库无关，跟 NULL 和非 NULL 无关。
    * 说明： count(*)会统计值为 NULL 的行，而 count(列名)不会统计此列为 NULL 值的行。
1.  `count(distinct col)` 计算该列除 NULL 之外的不重复行数。
    {{< note >}}count(distinct col1, col2) 如果其中一列全为 NULL，那么即使另一列有不同的值，也返回为 0。{{</ note >}}
1. 当某一列的值全是 NULL 时， count(col)的返回结果为 0，但 sum(col)的返回结果为 NULL，因此使用 sum()时需注意 NPE 问题。
    * 正例： 可以使用如下方式来避免 sum 的 NPE 问题：

        ```
        SELECT IF(ISNULL(SUM(g)),0,SUM(g))
        FROM table;
        ```
1. 使用 ISNULL()来判断是否为 NULL 值。
    * 说明： NULL 与任何值的直接比较都为 NULL。
        1. NULL<>NULL 的返回结果是 NULL， 而不是 false。
        1. NULL=NULL 的返回结果是 NULL， 而不是 true。
        1. NULL<>1 的返回结果是 NULL，而不是 true。
1.  在代码中写分页查询逻辑时，若 count 为 0 应直接返回，避免执行后面的分页语句。
1. 不得使用外键与级联，一切外键概念必须在应用层解决。
    * 说明：以学生和成绩的关系为例，学生表中的 student\_id是主键，那么成绩表中的 student_id 则为外键。如果更新学生表中的 student\_id，同时触发成绩表中的 student_id 更新， 即为级联更新。外键与级联更新适用于单机低并发，不适合分布式、高并发集群；级联更新是强阻塞，存在数据库更新风暴的风险:外键影响数据库的插入速度。
1. 禁止使用存储过程，存储过程难以调试和扩展，更没有移植性。
1. 数据订正（特别是删除、 修改记录操作） 时，要先 select，避免出现误删除，确认无误才能执行更新语句。

#### 推荐规约

1.  in 操作能避免则避免，若实在避免不了，需要仔细评估 in 后边的集合元素数量，控制在 1000 个之内。

#### 规约参考

1.  如果有全球化需要，所有的字符存储与表示，均以 utf-8 编码，注意字符统计函数的区别。
    * 说明：

        ```
        SELECT LENGTH("轻松工作")；\\返回为 12
        SELECT CHARACTER_LENGTH("轻松工作")；\\返回为 4
        ```
    * 如果需要存储表情，那么选择 utf8mb4 来进行存储，注意它与 utf-8 编码的区别。
1.  不建议在开发代码中使用此语句 TRUNCATE TABLE
    * TRUNCATE TABLE 比 DELETE 速度快，且使用的系统和事务日志资源少，但 TRUNCATE 无事务且不触发 trigger，有可能造成事故，故不建议在开发代码中使用此语句。
    * 说明： TRUNCATE TABLE 在功能上与不带 WHERE 子句的 DELETE 语句相同。

## ORM 映射

#### 强制要求

1. 在表查询中，一律不要使用 * 作为查询的字段列表，需要哪些字段必须明确写明。
    * 说明：
        1. 增加查询分析器解析成本.
        1. 增减字段容易与 resultMap 配置不一致。
1.  POJO 类的布尔属性不能加 is，而数据库字段必须加 is_，要求在 resultMap 中进行
字段与属性之间的映射。
1. 不要用 resultClass 当返回参数，即使所有类属性名与数据库字段一一对应，也需要定义；反过来，每一个表也必然有一个与之对应。
    * 说明： 配置映射关系，使字段与 DO 类解耦，方便维护。
1. sql.xml 配置参数使用： `#{}`， `#param#` 不要使用${} 此种方式容易出现 SQL 注入。
1.  iBATIS 自带的 `queryForList(String statementName,int start,int size)`不推荐使用。
    * 说明：其实现方式是在数据库取到 statementName对应的SQL语句的所有记录，再通过 subList
    取 start,size 的子集合。
    * 正例：

        ```
        Map<String, Object> map = new HashMap<String, Object>();
        map.put("start", start);
        map.put("size", size);
        ```
1. 不允许直接拿 HashMap 与 Hashtable 作为查询结果集的输出。
    * 说明： resultClass=”Hashtable”， 会置入字段名和属性值，但是值的类型不可控。
1. 更新数据表记录时，必须同时更新记录对应的 gmt_modified 字段值为当前时间。

#### 推荐规约

1. 不要写一个大而全的数据更新接口。 传入为 POJO 类，不管是不是自己的目标更新字
段，都进行 `update table set c1=value1,c2=value2,c3=value3;` 这是不对的。执行 SQL时， 不要更新无改动的字段，一是易出错； 二是效率低； 三是增加 binlog 存储。

#### 规约参考

1.  `@Transactional` 事务不要滥用。事务会影响数据库的 QPS，另外使用事务的地方需要考虑各方面的回滚方案，包括缓存回滚、搜索引擎回滚、消息补偿、统计修正等。
1.  `<isEqual>`中的 `compareValue` 是与属性值对比的常量，一般是数字，表示相等时带上此条件； `<isNotEmpty>`表示不为空且不为 `null` 时执行；`<isNotNull>`表示不为 `null` 值时执行。
