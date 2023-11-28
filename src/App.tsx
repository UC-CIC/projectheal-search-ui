import React from 'react';
import { Routes, Route } from "react-router-dom";
import { BrowserRouter } from 'react-router-dom' ;
import { Misinfo } from './models/misinfo.model';
import {useState, useEffect} from "react";
import {useQuery, useMutation} from 'react-query';
import './App.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import Header from './components/Header';
import Sidenav from './components/Sidenav';
import Display from './components/Display';
import Card from 'react-bootstrap/Card';
import Home from './components/Home';
import InsertHome from './components/InsertHome';


function App() {

  return (
    <>
      <Header />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/insert" element={<InsertHome />} />
        </Routes>
      </BrowserRouter>
      
    </>
  );
}

export default App;
