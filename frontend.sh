#!/bin/bash

userid=$(id -u)

if [ $userid -ne 0 ]; then
    echo "run with root privilages"
    exit 1
fi

CHECK () {
    if [ $1 -eq 0 ]; then
        echo "$2 ... Success"
    else
      echo "$2 ... failure"
      exit 1
    fi
}

dnf module list nginx 
CHECK $? "checking if already exist"

dnf module disable nginx -y
CHECK $? "disabling current version"

dnf module enable nginx:1.24 -y
CHECK $? "enabling version"

dnf install nginx -y
CHECK $? "installing nginx"

