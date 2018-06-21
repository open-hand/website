## Instructions for Contributing to the Choerodon Documentation

Welcome! We are very pleased you want to contribute to the Choerodon documentation.

You can click the **Fork** button in the upper-right area of the screen to create a copy of this repository in your GitHub account called a *fork*. Make any changes you want in your fork, and when you are ready to send those changes to us, go to your fork and create a new pull request to let us know about it.

Once your pull request is created, a Choerodon reviewer will take responsibility for providing clear, actionable feedback.  As the owner of the pull request, **it is your responsibility to modify your pull request to address the feedback that has been provided to you by the Choerodon reviewer.**  Also note that you may end up having more than one Choerodon reviewer provide you feedback or you may end up getting feedback from a Choerodon reviewer that is different than the one originally assigned to provide you feedback. Reviewers will do their best to provide feedback in a timely fashion but response time can vary based on circumstances.

## Thank you!

Choerodon thrives on community participation, and we really appreciate your
contributions to our site and our documentation!


## Choerodon Theme
### Markdown Custom Style

* note

![](/static/img/readme/note.jpg)

Usage:
```
{{< note >}}
One-click deployment of Choerodon and step-by-step deployment of Choerodon require the server to be able to connect to the external network. Users can choose the appropriate installation method according to their actual situation.
{{< /note >}}
```

* warning

![](/static/img/readme/warning.jpg)

Usage:
```
{{< warning >}}
Etcd nodes and Master nodes must be consistent.
{{< /warning >}}
```

* annotation

![](/static/img/readme/annotation.jpg)

Usage:
```
{{< annotation shell "[mysql pod name]Replace it with the name of the container you want to enter">}}
kubectl get po -n choerodon-devops-prod
kubectl exec -it [mysql pod name] -n choerodon-devops-prod bash (1)
mysql -uroot -p${MYSQL_ROOT_PASSWORD}
{{< /annotation >}}
```