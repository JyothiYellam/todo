#!/bin/bash
userid=$(id -u)
if [ $userid -ne 0 ]; then 
   echo "run with root user"
   exit 1
fi 


CHECK () {
    if [ $1 -eq 0 ];
     then 
       echo "$2 ... success "
    else 
     echo "$2 ... failure"
    fi
}

cp mongo.repo /etc/yum.repos.d/mongo.repo
CHECK $? "Copying Mongo Repo"

mongod --version
if [ $? -eq 0 ]; then
   echo "Mongodb already installed ... skipping"
else
    echo "Installing now"
    dnf install mongodb-org -y
    CHECK $? "installing mongodb" 
fi 

systemctl enable mongod
CHECK $? "Enable MongoDB"

systemctl start mongod
CHECK $? "Start MongoDB"