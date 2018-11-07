---
layout: post
title: Deploy a .NET Core app on Digital Ocean with Docker, NGINX, and Let's Encrypt
date: 2018-11-7
categories:
  - dotnet
  - docker
  - digital-ocean
comments: true
description: Deploying an ASP.NET Core app to Digital Ocean with Docker, NGINX, and Let's Encrypt
image: /images/docker_digital_encrypt.png
featured_image: /images/docker_digital_encrypt.png
featured_image_max_width: 300px
---

# Deploy a .NET Core app on Digital Ocean with Docker, NGINX, and Let's Encrypt


<img src="/images/docker_digital_encrypt.png" class="img-md img-center"  alt="docker logo">


I initially deployed my .NET Core app, the [Alpaca Tracker]({{ site.baseurl }}{% post_url 2018-09-02-alpaca-tracker %}), to Azure App Service. Overall I was pleased with the service, but not with the price! I figured I could save roughly $50 a month moving to a $10 Digital Ocean droplet. I'm writting this to share what I learned and to document the proccess for the next time I need it.

## Setting Up Docker

Before we begin, head over to the [Docker site](https://www.docker.com/get-started) and follow their directions on installing Docker on your particular platform.


Here is the folder structure for my app. Notice the dockerfile, and the docker-compose.yml.

<img src="/images/dotnet-folders.png" class="img-md img-center"  alt="folder layout">

## dockerfile

The dockerfile contains the build instructions for the dotnet app. It begins by using the sdk image for building the app and then uses a lightweight runtime image, copying the output of the previous build. Next, we expose port 5000 and specify the entry point of the application.

<script src="https://gist.github.com/blehr/5785730971a728b882deea5841c3f749.js"></script>


## docker-compose

Docker-Compose allows us to provide the instructions for building all of the containers needed for our deployment. It begins by defining each of our services. Here they are **app** and **https-portal**. The app service simply builds the container with dockerfile we previously created.


Next, is the [https-portal](https://github.com/SteveLTN/https-portal). What is that you ask? Well, that is the magical image that makes the whole nginx reverse-proxy and Let's Encrypt integration a beautiful experience!


From their github readme...


>HTTPS-PORTAL is a fully automated HTTPS server powered by Nginx, Let's Encrypt and Docker. By using it, you can run any existing web application over HTTPS, with only one extra line of configuration.
>
>The SSL certificates are obtained, and renewed from Let's Encrypt automatically.



The https-portal service specifies the image, ports to be exposed, links which allow the connection to the app service, and environment. The environment is where the reverse proxy is configured. The DOMAINS for this app directs it to forward everything to my domain, alpacatracker.com, on to the app service on the port that was specified in the dockerfile. Finally, the STAGE is specified so that the Let's Encrypt certificates will be downloaded and configured.


<script src="https://gist.github.com/blehr/add67a4e70f3d1ea19886c9d2b1f3e62.js"></script>


Before we head over to Digital Ocean, push all of these changes up to your github repo.


## Digital Ocean

Head on over to [Digital Ocean](https://www.digitalocean.com/) and signup for an account if you don't already have one. If you are signing up, you can use this [link](https://m.do.co/c/0f172e230c36) which will give you some free credits to get started, as well as to me for the referral.


## Create a new Droplet. 

Begin by selecting the one-click docker app. Next, select your size and data center region. The rest can be left as defaults, but I personally choose to add my ssh keys at this point. It just makes things easier when logging into the droplet.


<img src="/images/docker_one_click.png" class="img-center"  alt="Digital Ocean one-click">


## Setting up the Droplet

The first thing tht needs to be done is to log in as root, create a new user, grant them permissions, and set up the firewall. Here is a link to Digital Ocean's own guide on the matter, [Initial Server Setup with Ubuntu 18.04](https://www.digitalocean.com/community/tutorials/initial-server-setup-with-ubuntu-18-04). When you finish up there, come on back and we will continue with deploying our app.

## Domain Name

To use [let's encrypt](https://letsencrypt.org/) certificates you must first register a domain name and point it towards your server. I have been using [Google Domains](https://domains.google/) lately, but buy them from whomever your prefer and follow their directions for configuring the DNS records.



## Deploy

Now, ssh into your droplet using the user that you had created while following the server setup guide. Entering <code>pwd</code> should reveal that you are currently located at <code>home/USERNAME</code>. I chose to create a folder for my apps simply called apps, but this is entirely up to you, <code>mkdir apps</code>. If you did as I did, then `cd apps` to enter the newly created folder.

## To the Cloud 👆

Now it is time to get your code into the droplet. Inside the apps directory, simply <code>git clone https://github.com/NAME/REPO.git</code> Then cd into the newly created directory. If everything is configured correctly, you should be able to enter <code>docker-compose build</code> and see the output of the process.


When that completes, enter <code>docker-compose up</code> which will spin up the containers remaining attached to the terminal so that you view the output. If it is successful, you will see that the certificates are downloaded. Open your browser and check to see if all is well.


If it is good, hit <code>control-c</code> to shut down the containers, and now restart using <code>docker-compose up -d</code> which will run in detached mode, freeing up the terminal.


## Wrapping Up

The process is pretty straight forward, and I haven't had any problems with my site. If you encounter any problems be sure to check out the docs for [https-portal](https://github.com/SteveLTN/https-portal) as the image provides many ways to custom configure things for your individual needs.





