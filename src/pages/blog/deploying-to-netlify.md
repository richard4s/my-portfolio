---
path: "/deploying-to-netlify"
date: "2019-02-22"
title: "Deploying To Netlify"
featuredImage: "../../images/netlify.png"
---

<br>
A thorough and deliberate walk through on deploying your one page, static or serveless websites to netlify, even creating and deploying on your subdomains all for for the price of oxygen(free).<br>

First off, there a couple of things you should get sorted out. I suspect you already have an account with github or bitbucket, I'm really not sure of other vcs systems but gitlab should also work fine. It's important to understand how netlify works before you begin your adventure. Netlify, just like heroku and some other platforms is a cloud computing company that offers hosting of serverless web applications or static websites to be honest. Before I dive deeper, I am in no way paid to do this, It's just a personal recommendation of mine because I have used them and still currently do.<br>

Netlify has a lot of advantages, especially for those of us that love free stuff. The major stuff is your get as many free domains as you would want, the caveat being they would have to `{domain-you-want}.netlify.com` in that order 😀 but if you already do have a domain you own, you can easily point the DNS to netlify.<br>

You get free and automated CI/CD(Continuous Integration and Continuous Deployment) which is quite cool and impressive, for those new to CI/CD, it basically means as soon as you push code to your repository, it would automatically build and deploy on the live site automagically. It's quite handy as it eliminates the need to login through ssh everytime there's a change to be made, CI/CD should be an entire chapter on its own, you might wonder what would happen if there's a bug in your application, not to worry, with CI/CD any build errors you get would not be published. You would need to fix the errors during build before you can have a seamless CI/CD.(A whole new blog post is definitely coming for this or just see an add about Circle CI in your free time).<br>

Another exciting feature of Netlify is the free ssl they give configured to your website, you might think this is a good thing but think of all the malicious activity hackers and phising sites could use with this, I like it because our friends from Let's Encrypt give it to us for free forever but in the long run, security wise, it would come back to bite.<br>

A very interesting of all these features is that your website doesn't necessarily need to be static, if built with cool javascript frameworks like react or gatsby, it could be just as dynamic as NASDAQ's website lol.

To the meat of it, go to [Netlify](https://www.netlify.com) and get your free account, filling a sign up form shouldn't be too difficult, you should also verify your email I guess, basic stuff. After signup, connect tour github account to netlify or just signup with your github accounts instead (recommended). Connect your repo, the one your website is on to netlify.<br>

Set up your build script, you know for that special website based on the framework you used and hit deploy. if all goes well, you should see a success message that your site is live, a .netlify.com domain is also privided to you with free ssl enabled forever. You could change the .netlify.com domain to your own preferred domain by pointing the nameservers to netlify's in the domain management section. 