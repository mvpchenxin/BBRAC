#!/bin/bash

echo "Test begin"

for ((i=1;i<=100;i++));  do   
  echo "the $i test"
  /usr/bin/time -ao timeTestResult.txt -f '%S' node 03_request_illegal.js
  sleep 5
done 

echo "Test done"
