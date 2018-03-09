+++
title = "HAP Cloud与HAP3-0的开发方式对比"
date = "2017-02-01"
draft = false
weight = 4
+++

# 开发项分析

<table>
    <thead>
        <tr>
            <th>开发项/版本</th>
            <th>Hap Cloud</th>
            <th>Hap 3.0</th>
            <th>相同点</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>建表方式</td>
            <td>\</td>
            <td>\</td>
            <td>通过groovy建表脚本</td>
        </tr>
        <tr>
            <td>创建DTO类</td>
            <td>
                <p>1.创建在xxx.&lt;module&gt;.domain包下</p>
                <p>2.继承AuditDomain类</p>
            </td>
            <td>
                <p>1.创建在xxx.&lt;module&gt;.dto包下</p>
                <p>2.继承BaseDTO类</p>
                <p>3.支持数据多语言</p>
            </td>
            <td>
                <p>1.每一个dto类对应数据库中一张表，并用@Table (name = “table_name”)注解来指定对应表名</p>
                <p>2.命名规范相同</p>
            </td>
        </tr>
        <tr>
            <td>创建Mapper、XML</td>
            <td>继承BaseMapper&lt;DTO&gt;类</td>
            <td>继承Mapper&lt;DTO&gt;类</td>
            <td>
                <p>1.对于基本的CRUD操作都是通过继承通用Mapper&lt;DTO&gt; 来自动实现
                </p>
                <p>2.对于相对复杂的关联查询都可通过Mybatis中内置标 签生成动态sql来实现
                </p>
            </td>
        </tr>
        <tr>
            <td>创建Service</td>
            <td>\</td>
            <td>\</td>
            <td>对于基本的CRUD操作的都是通过继承BaseService&lt;DTO&gt;</td>
        </tr>
        <tr>
            <td>创建Controller</td>
            <td>通过@RestController或@Controller指定类 为controller类
            </td>
            <td>通过@Controller指定一个类为controller类</td>
            <td>
                <p>1.命名规范相同</p>
                <p>2.通过 @Autowired 注入 Service</p>
            </td>
        </tr>
        <tr>
            <td>测试</td>
            <td>
                        <p>1.通过Junit进行单元测试</p>
                        <p>2.分别编写controller，service,mapper各类测试代码，进而通过测试方法进行测试</p>
                    <p>3.使用SonarQube进行代码质量管理</p>
            </td>
            <td>\</td>
            <td>\</td>
        </tr>
        <tr>
            <td>后端主要技术</td>
            <td>Spring Boot + Mybatis</td>
            <td>Spring + Spring MVC + Mybatis</td>
            <td>\</td>
        </tr>
        <tr>
            <td>前端主要技术</td>
            <td>React+Mobx+Ant Design</td>
            <td>kendoUI开源框架</td>
            <td>\</td>
        </tr>
    </tbody>
</table>