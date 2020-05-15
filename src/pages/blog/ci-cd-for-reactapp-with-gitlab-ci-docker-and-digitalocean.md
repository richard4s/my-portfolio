---
path: "/ci-cd-for-reactapp-with-gitlab-ci-docker-and-digitalocean"
date: "2020-05-09"
title: "CI/CD For React App With Gitlab CI, Docker and Digitalocean"
featuredImage: "../../images/GitLab-CI-CD-and-Selenium-Grid.jpg"
---

<br>
Fresh out the bat after finally completing your new react project, you must be feeling pumped and ready to unleash your web app for the world to admire huh? That's fine, I guess. It's only the right thing to do. <br>

So you went against what everyone was saying about going serverless or you just really want to get all your project on your digitalocean droplet or for whatever reason you didn't use any of [Github Pages](https://pages.github.com/), [Netlify](https://www.netlify.com), [Gitlab Pages](https://docs.gitlab.com/ee/user/project/pages/), [Heroku](https://www.heroku.com/) and the rest. You took the bold step of wanting to manage everything on your server. Stupid! You are going to get introduced to a new world of pain so get ready!

### Your requirements:

- Digitalocean droplet with Ubuntu server ~16.4
- Docker - [How To Install and Use Docker on Ubuntu](https://www.digitalocean.com/community/tutorials/how-to-install-and-use-docker-on-ubuntu-16-04): Follow steps 1 and 2 to install Docker on the server
- [Gitlab Repository](https://gitlab.com)
- Familiarity with [SSH](https://www.hostinger.com/tutorials/ssh-tutorial-how-does-ssh-work)
- Connection to server via SSH, if not create one with sshkeygen
- Admin access to gitlab repository
- Your react project already in that repository

### Adding gitlab CI to your repo
Gitlab CI looks for a `.gitlab-ci.yml` in the repository you want the CI/CD to run. So at the root of your project folder, create a `.gitlab-ci.yml` and add the folllowing content to it for react. For other formats, you can look up the references documentation here [Gitlab Reference Documentation](https://docs.gitlab.com/ce/ci/yaml/README.html). 
You'll need to create variables, In your gitlab repository, go to `Settings > CI/CD > Variables` and then click the expand button by the side, it should look something like the picture below:

![CI/CD Variables](../../images/variables-ci-cd.png)

#### Add the following variables
- `$SSH_PRIVATE_KEY` - The value is your SSH private key generated from your digitalocean server (e.g. content of ~/.ssh/id_rsa)
- `$SSH_USERNAME` - The username of the ssh used to login to your server (e.g. root)
- `$SSH_IP` - The IP address of your server (e.g. 192.292.28.132 or example.com)
- 1 - The path to your project on your server

The project on your server must have been initially cloned from your repository / linked via git remote add … and in sync.
For React, the code below should go into your `.gitlab-ci.yml`:
<pre>
image: node:latest

stages:
  - build
  - deploy

cache:
  paths:
    - node_modules/

install_dependencies:
  stage: build
  script:
    - npm install
  artifacts:
    paths:
      - node_modules/


before_script:
  - apt-get update -qq
  - apt-get install -qq git
  # Setup SSH deploy keys
  - 'which ssh-agent || ( apt-get install -qq openssh-client )'
  - eval $(ssh-agent -s)
  - ssh-add <(echo "$SSH_PRIVATE_KEY")
  - mkdir -p ~/.ssh
  - '[[ -f /.dockerenv ]] && echo -e "Host *\n\tStrictHostKeyChecking no\n\n" > ~/.ssh/config'
    
deploy_staging:
  stage: deploy
  type: deploy
  environment:
    name: staging
    url: theknowledgeapp.com
  script:
    - ssh {$SSH_USERNAME}@{$SSH_IP} "cd /var/www/{path-to-project} && git checkout dev && git pull origin master && npm run build && exit"
  only:
    - master
</pre>

Now when you make any commit and push to your repos `master`'s branch Gitlab would attempt to trigger continuous integration for your project.
You will be taken to the pipeline overview page, where you can see that the CI run is marked as pending and labeled as “stuck”:

![Pipeline Stuck](../../images/pipeline_index_stuck.png)

If you click the pending status to get more info you would get:

![Pipeline Detail](../../images/pipeline_detail_view.png)

If you click the `install_dependencies` job, you would see more specific details of what might be delaying the CI. You would be greeted with a warning notification at the top indicating that the pipeline is stuck because of a lack of runners. Before we create a runner, we need to setup the GItlab runner service on our digitalocean server, so log in to your server to download the latest version of the gitlab runner service with the command:
<pre>$ curl -L https://packages.gitlab.com/install/repositories/runner/gitlab-runner/script.deb.sh -o /tmp/gl-runner.deb.sh</pre>

You can check the similarity of the contents of the script just downloaded to the one here -> [Gitlab Runner](https://packages.gitlab.com/runner/gitlab-ci-multi-runner/install). The location for the script just downloaded could be found here:
    <pre>$ less /tmp/gl-runner.deb.sh</pre>
Afterwards, you can go ahead and run the installer with the command:
    <pre>$ sudo bash /tmp/gl-runner.deb.sh</pre> 
And then start the runner with this command:
    <pre>$ sudo apt-get install gitlab-runner</pre>

## Enable Gitlab Runners
In your gitlab's repository, go to `Settings > CI/CD > Runners` and expand, you should see `Shared Runners`.
![Shared Runner](../../images/specific_runner.png)

<code>Disable it</code> for this project by clicking the **disable button**. At the left-hand side you should see a title that reads <code>Set up a specific Runner manually</code>. 

![One Runner](../../images/one_runner.png)

Copy the <code>token</code> under it, head back to your digitalocean server and type the following command:
<pre>$ sudo gitlab-runner register</pre>
You will be asked some configuration questions for the runner such as:

 - Please enter the gitlab-ci coordinator URL: Enter your repository host name, in our case, `https://gitlab.com`
 - Please enter the gitlab-ci token for this runner: The `token` you just copied from the runners page
 - Please enter the gitlab-ci description for this runner: The name you want to give to this runner
 - Please enter the gitlab-ci tags for this runner (comma separated): You can leave this blank
 - Please enter the executor: Type in `docker`
 - Please enter the default Docker image (e.g. ruby:2.1): Type in `alpine:latest`.

To check and see if your intallation went succesfully, run:
    <pre>$ sudo gitlab-runner list</pre>You should see an output similar to
    <pre>
        Listing configured runners                          ConfigFile=/etc/gitlab-runner/config.toml
        example-runner                                      Executor=docker Token=e746250e282d197baa83c67eda2c0b URL=https://example.com
    </pre>

## Test CI
In your web browser, you can view the running CI in your gitlab repository, by trying to add a new commit or going to `CI/CD > Pipeline` and viewing all your pipelines. If it is still running you might see something like,

![CI Running](../../images/cione_running.png)
When the CI has run and is successful, it should show this,
![CI Ran](../../images/ci_ran.png)
You can click on the first check icon or the `install_dependncies` job to view the details of the runner

![Pipeline Overview](../../images/pipeline_overview.png)

You would notice there is no longer a notice of no runners being available and your CI/CD has built successfully. 

`TIP:` In your `Virtualhost` file in your site-available, put the site root at `/var/www/{path-to-project}/build because the react production build would be kept in the build folder of the project's directory.

Go to the domain of your site and you should see your new commit take effect. Yayy!!! 🎉

## References
- [How To Set Up Continuous Integration Pipelines with GitLab CI on Ubuntu 16.04](https://www.digitalocean.com/community/tutorials/how-to-set-up-continuous-integration-pipelines-with-gitlab-ci-on-ubuntu-16-04)
- [A gitlab-ci config to deploy to your server via ssh](https://medium.com/@hfally/a-gitlab-ci-config-to-deploy-to-your-server-via-ssh-43bf3cf93775)