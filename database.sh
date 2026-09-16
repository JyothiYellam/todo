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

Install mongodb
CHECK $? "mongodb Installation"