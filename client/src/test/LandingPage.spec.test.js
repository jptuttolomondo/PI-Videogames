/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import {LandingPage} from '../../src/components/landing/landingPage'
import { Link, MemoryRouter } from 'react-router-dom';
import isReact from 'is-react'
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import { configure, shallow } from 'enzyme';

configure({ adapter: new Adapter()});

describe("<LandingPage/>",()=>{ 
let landing;
beforeEach(()=>{
landing=shallow(<LandingPage/>)
expect(isReact.classComponent(LandingPage)).toBeFalsy();
});
it('deberia renderizar un link a /home',()=>{
expect(landing.find(Link).length).toBeGreaterThanOrEqual(1);
})


it('deberia renderizar un <button> a Ingresar',()=>{
  expect(landing.find("button").length).toBeGreaterThanOrEqual(1);
  })

  it('deberia renderizar dos <div>',()=>{
    expect(landing.find("div").length).toBeGreaterThanOrEqual(2);
  })
 
  it('deberia renderizar dos <p>',()=>{
      expect(landing.find("p").length).toBeGreaterThanOrEqual(2);
  })
  
  it('deberia renderizar dos <span>',()=>{
    expect(landing.find("span").length).toBeGreaterThanOrEqual(2);
})

it('deberia renderizar seis <br>',()=>{
  expect(landing.find("br").length).toBeGreaterThanOrEqual(6);
})


})

