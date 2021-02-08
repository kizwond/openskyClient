import React, {Component} from 'react';
import axios from 'axios'

const getData = (url, key, here) => {
    console.log("controller fired!!!")
    axios.get(url)
    .then(res => {
        here({
        [key]:res.data.categorybooklist
        })
    })
  }

export default getData;
