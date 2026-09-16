#!/bin/bash

CHECK () {
  if [ $1 -eq 0 ] ; then
    echo "success ... $2"
  else
    echo "failure"
    exit 1
  fi
}

node --version
CHECK $? "checking nodejs installation"

cd backend/
CHECK $? "changed directory"

npm install
CHECK $? "checking whether dependencies installed or not"
