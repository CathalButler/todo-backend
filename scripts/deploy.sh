#!/bin/bash

EB_APP="todo-api"
STAGING_BRANCH="dev"
PRODUCTION_BRANCH="main"

# Determine the environment to deploy to based on which branch this commit is on
NODE_ENV=''
if [[ $TRAVIS_BRANCH == $STAGING_BRANCH ]]; then
  NODE_ENV="staging"
  echo "Not deploying"
elif [[ $TRAVIS_BRANCH == $PRODUCTION_BRANCH ]]; then
  NODE_ENV="production"
else
  # Don't want to deploy if it's not one of the above branches
  echo "Not deploying"
  exit
fi


EB_ENV="$EB_APP-$NODE_ENV"
echo "Deploying to $EB_ENV"


# Configure AWS credentials for Elastic Beanstalk
mkdir -p ~/.aws
echo '[default]' >>~/.aws/credentials
echo "aws_access_key_id=$AWS_ACCESS_KEY_ID" >>~/.aws/credentials
echo "aws_secret_access_key=$AWS_SECRET_ACCESS_KEY" >>~/.aws/credentials

# Install AWS-EB-CLI using Python
pip3 install awsebcli --upgrade --user

# Deploy application to the appropriate ElasticBeanstalk env
eb status EB_ENV

#eb setenv

# Deploy Application to EB
eb deploy $EB_ENV -v

# Remove aws credentials
rm ~/.aws/credentials
