#!/bin/bash
userid=$(id -u)

if [ $userid -ne 0 ]; then
    echo "run with root privilages"
    exit 
fi 

CHECK () {
  if [ $1 -eq 0 ] ; then
    echo "success ... $2"
  else
    echo "failure"
    exit 1
  fi
}

dnf module disable nodejs -y
CHECK $? "Disabling current nodejs"

dnf module enable nodejs:20 -y
CHECK $? "enabling nodejs"

dnf install nodejs -y
CHECK $? "Installing nodejs"

node --version
CHECK $? "chekcing node version"

cd backend/
CHECK $? "changed directory"

npm install
CHECK $? "checking whether dependencies installed or not"

cp todo-backend.service /etc/systemd/system/todo-backend.service
CHECK $? "copying the servicefile"

systemctl daemon-reload
CHECK $? "reload the service"

systemctl enable todo-backend
CHECK $? "enabling the serive"

systemctl start todo-backend
CHECK $? "start the service"

