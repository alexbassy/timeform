import React from 'react'
import styled, { css } from 'react-emotion'

const dropdownArrow = `<svg xmlns='http://www.w3.org/2000/svg' width='768' height='768' viewBox='0 0 768 768'><g/><path d='M223.5 319.5h321L384 480z' fill='#555'/></svg>`

export const Label = styled('label')`
  display: block;
  margin-bottom: 8px;
  font-size: 16px;
  font-weight: 500;
`

const states = css`
  &[disabled] {
    background-color: #00000005;
  }
  
  &.is-focused,
  &:focus {
    outline: none;
    background-color: #00000010;
    box-shadow: 0 0 0 2px #4399fa50;
  }
`

export const Input = styled('input')`
  font-size: 16px;
  padding: 6px 12px;
  margin: 8px 4px;
  height: 32px;
  border: none;
  background: #00000010;
  border-radius: 6px;
  -webkit-appearance: none;
  user-select: none;
  transition: background-color .15s ease, box-shadow.15s ease;
  text-align: ${props => props.textAlign || 'left'};
  
  ${states}
`

export const Select = styled('select')`
  font-size: 16px;
  padding: 6px 32px 6px 12px;
  margin: 8px 4px;
  height: 32px;
  background: #00000010 no-repeat center right 8px/20px url("data:image/svg+xml;utf8,${dropdownArrow}");
  border: none;
  border-radius: 6px;
  -webkit-appearance: none;
  user-select: none;
  transition: background-color .15s ease;
  
  ${states}
`

export const Button = styled('button')`
  background-image: linear-gradient(150deg, #cf3bff, #1675ec);
  color: #fff;
  padding: 16px 24px;
  border: 0;
  height: 52px;
  min-width: 100px;
  border-radius: 4px;
  font-weight: bold;
  cursor: pointer;
  transition: box-shadow .25s ease;
  
  &[disabled] {
    background-image: linear-gradient(150deg, #bbb, #d4d4d4);
    color: #f2f2f2;
  }
  
  &:active, 
  &:focus {
    outline: none;
    box-shadow: 0 0 0 4px #4399fa60;
  }
`
