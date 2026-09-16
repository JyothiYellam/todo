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

mongod --version
CHECK $? "checking installation"

cat <<EOF > /etc/yum.repos.d/mongodb-org-7.0.repo
[mongodb-org-7.0]
name=MongoDB Repository
baseurl=https://repo.mongodb.org/yum/redhat/9/mongodb-org/7.0/x86_64/
enabled=1
gpgcheck=0
EOF
CHECK $? "Adding MongoDB repository"

dnf install mongodb-org -y
CHECK $? "installing mongodb" 