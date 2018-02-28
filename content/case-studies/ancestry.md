---
title: Ancestry Case Study
date: "2015-10-10T13:07:31+02:00"
tags: ["ipsum"]
type: "case-studies"
categories: ["lorem"]
banner: "/img/case_studies/haufegroup_logo_feature.png"
summary: 吱吱吱吱吱吱吱吱吱吱吱吱吱吱吱吱吱吱吱吱吱吱吱吱吱吱吱吱吱吱吱吱吱吱吱吱吱吱吱吱吱吱吱吱吱吱吱吱吱吱吱吱吱吱吱吱吱
---
<hr>
<section class="section1">
<div class="cols">
<div class="col1">

<h2>Challenge</h2>
Ancestry, the global leader in family history and consumer genomics, uses sophisticated engineering and technology to help everyone, everywhere discover the story of what led to them. The company has spent more than 30 years innovating and building products and technologies that at their core, result in real and emotional human responses. <a href="https://www.ancestry.com">Ancestry</a> currently serves more than 2.6 million paying subscribers, holds 20 billion historical records, 90 million family trees and more than four million people are in its AncestryDNA network, making it the largest consumer genomics DNA network in the world. The company's popular website, <a href="https://www.ancestry.com">ancestry.com</a>, has been working with big data long before the term was popularized. The site was built on hundreds of services, technologies and a traditional deployment methodology. "It's worked well for us in the past," says Paul MacKay, software engineer and architect at Ancestry, "
<br>
</div>

<div class="col2">
  <h2>Solution</h2>
  The company is transitioning to cloud native infrastructure, using <a href="https://www.docker.com">Docker</a> containerization, <a href="https://kubernetes.io">Kubernetes</a> orchestration and <a href="https://prometheus.io">Prometheus</a> for cluster monitoring.<br>
<br>
<h2>Impact</h2>
  "Every single product, every decision we make at Ancestry, focuses on delighting our customers with intimate, sometimes life-changing discoveries about themselves and their families," says MacKay. "As the company continues to grow, the increased productivity gains from using Kubernetes has helped Ancestry "
</div>
</div>
</section>

<div class="banner2" style="margin-top:40%">
  <div class="banner2text" style="padding-top:10px;padding-bottom:10px;color:white;background-color:#666666;text-align:center;padding-left:20%;padding-right:20%;font-size:24px" >
    "At a certain point, you have to step back if you're going to push a new technology and get key thought leaders with engineers within the organization to become your champions for new technology adoption. At training sessions, the development teams were always the ones that were saying, 'Kubernetes saved our time tremendously; it's an enabler. It really is incredible.'"
    <br><br><span style="font-size:16px">- PAUL MACKAY, SOFTWARE ENGINEER AND ARCHITECT AT ANCESTRY</span>
  </div>
</div>

<section class="section2" style="margin-top:4%;margin-bottom:4%;padding-left:20px;padding-right:20px">
<div class="fullcol" style="margin-left:10%;margin-right:11%">
    Since its introduction a decade ago, the Shaky Leaf icon has become one of Ancestry's signature features, which signals to users that there's a helpful hint you can use to find out more about your family tree.<br><br>
    So when the company decided to begin moving its infrastructure to cloud native technology, the first service that was launched on <a href="https://kubernetes.io">Kubernetes</a>, the open source platform for managing application containers across clusters of hosts, was this hint system. Think of it as Amazon's recommended products, but instead of recommending products the company recommends records, stories, or familial connections. "It was a very important part of the site," says Ancestry software engineer and architect Paul MacKay, "but also small enough for a pilot project that we knew we could handle in a very appropriate, secure way."<br><br>
    And when it went live smoothly in early 2016, "our deployment time for this service literally was cut down from 50 minutes to 2 or 5 minutes," MacKay adds. "The development team was just thrilled because we're focused on supplying a great experience for our customers. And that means features, it means stability, it means all those things that we need for a first-in-class type operation."<br><br>
    The stability of that Shaky Leaf was a signal for MacKay and his team that their decision to embrace cloud native technologies was the right one for the company. With a private data center, 
</div>
</section>

<div class="banner3" >
  <div class="banner3text" style="padding-top:10px;padding-bottom:10px;color:white;background-color:#666666;text-align:center;padding-left:20%;padding-right:20%;font-size:24px">
"And when it [Kubernetes] went live smoothly in early 2016, 'our deployment time for this service literally was cut down from 50 minutes to 2 or 5 minutes,' MacKay adds. 'The development team was just thrilled because we're focused on supplying a great experience for our customers. And that means features, it means stability, it means all those things that we need for a first-in-class type operation.'"
  </div>
</div>

<section class="section3" style="margin-top:4%;margin-bottom:4%;padding-left:20px;padding-right:20px">
<div class="fullcol" style="margin-left:10%;margin-right:11%">
  That need led them in 2015 to explore containerization. Ancestry engineers had already been using technology like <a href="https://www.java.com/en/">Java</a> and <a href="https://www.python.org">Python</a> on Linux, so part of the decision was about making the infrastructure more Linux-friendly. They quickly decided that they wanted to go with Docker for containerization, "but it always comes down to the orchestration part of it to make it really work," says MacKay.<br><br>
  His team looked at orchestration platforms offered by <a href="https://docs.docker.com/compose/">Docker Compose</a>, <a href="http://mesos.apache.org">Mesos</a> and <a href="https://www.openstack.org/software/">OpenStack</a>, and even started to prototype some homegrown solutions. And then they started hearing rumblings of the imminent release of Kubernetes v1.0. "At the forefront, we were looking at the secret store, so we didn't have to manage that all ourselves, the config maps, the methodology of seamless deployment strategy," he says. "We found that how Kubernetes had done their resources, their types, their labels and just their interface was so much further advanced than the other things we had seen. It was a feature fit."<br><br>
  <div class="quote">
  Plus, MacKay says, "I just believed in the confidence that comes with the history that Google has with containerization. So we started out right on the leading edge of it. And we haven't looked back since."</div><br>
  Which is not to say that adopting a new technology hasn't come with some challenges. "Change is hard," says MacKay. "Not because the technology is hard or that the technology is not good. It's just that people like to do things like they had done [before]. You have the early adopters and you have those who are coming in later. It was a learning experience on both sides."<br><br>
  Figuring out the best deployment operations for Ancestry was a big part of the work it took to adopt cloud native infrastructure. "We want to make sure the process is easy and also controlled in the manner that allows us the highest degree of security that we demand and our customers demand," says MacKay. "With Kubernetes and other products, there are some good solutions, but a little bit of glue is needed to bring it into corporate processes and governances. It's like having a set of gloves that are generic, but when you really do want to grab something you have to make it so it's customized to you. That's what we had to do."<br><br>
  Their best practices include allowing their developers to deploy into development stage and production, but then controlling the aspects that need governance and auditing, such as secrets. They found that having one namespace per service is useful for achieving that containment of secrets and config maps. And for their needs, having one container per pod makes it easier to manage and to have a smaller unit of deployment.
<br><br>
</div>
</section>







