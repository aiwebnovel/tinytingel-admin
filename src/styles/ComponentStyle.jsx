import styled from 'styled-components';
import {Box, Flex} from '@chakra-ui/react';

export const Back = styled.button`
  background-color: #b8c6db;
  padding: 2px 10px;
  border: 1px solid #b8c6db;
  border-radius: 5px;
  margin-right: 10px;

  transition: all 300ms ease;

  &:hover {
    background-color: #e2e8f0;
    border: 1px solid #e2e8f0;
  }
`;

export const DeleteBtn = styled.button`
background-color: #ff5a52;
border-radius: 5px;
color: #fff;
padding: 2px 25px;
transition: all 300ms ease;

&:hover {
  background-color: #d83536;
  color: #fff;
}
`

export const CancelBtn = styled.button`
  background-color: #f9f9f9;
  border: 1px solid #444;
  border-radius: 5px;
  color: #444;
  padding: 2px 25px;
  transition: all 300ms ease;

  &:hover {
    background-color: #444;
    color: #fff;
  }
`

export const SmallDelete = styled.button`
background-color: #ff5a52;
padding: 2px 8px;
border: 1px solid #ff5a52;
border-radius: 5px;
color: #fff;
width: 80px;
transition: all 300ms ease;

&:hover {
  background-color: #d83536;
  border: 1px solid #d83536;
}
`;

export const Modify = styled.button`
background-color: #444;
padding: 2px 8px;
border: 1px solid #444;
border-radius: 5px;
color: #fff;
width: 80px;
transition: all 300ms ease;

&:hover {
  background-color: #e6f4f1;
  border: 1px solid #e6f4f1;
  color: #444;
}
`;

export const ExcelDownBtn = styled.button`
  background-color: #444;
  color: #fff;
  padding: 2px 10px;
  font-size: 15px;
  transition: all 300ms ease;
  word-break: keep-all;

  &:hover {
    background-color: #0098fa;
  }
`;

export const ResetBtn = styled.button`
background-color: #e6f4f1;
border: 1px solid #e6f4f1;
color: #444;
padding: 2px 10px;
font-size: 15px;
transition: all 300ms ease;
margin-right: 8px;
word-break: keep-all;

&:hover {
  background-color: #b8c6db;
}
`; 

export const BtnBox = styled.div`
width: 100%;
text-align: center;
padding: 30px 0;
`;

export const SerialInputBox = styled(Flex)`
align-items: center;
margin-bottom: 20px;

> label {
  min-width: 110px;
  font-weight: 600;
  word-break: keep-all;
  margin-bottom: 5px;
}
`;

export const TrStyle = styled.tr`
text-align: center;
`;

export const TbodyStyle = styled.tbody`
> tr > td {
  padding: 5px 8px;
}
`;

export const ExtraBtn = styled.button`
  background-color : #37a169;

  color : #fff;
  border-radius : 5px;
  padding : 2px 10px;
  transition: all 300ms ease-in-out;

  &:hover {
    background-color : #318e5d;
  }
`

export const NoDataBox = styled(Flex)`
  justify-content: center;
  align-items: center;

  background-color : #fff;
  height: 200px;
  margin-top: 30px;
  max-width: 1400px;
  margin: 30px auto 0;
  box-shadow:rgba(0, 0, 0, 0.15) 2.4px 2.4px 3.2px;

  text-align : center;
  font-size : 1.3rem;
  font-weight: 600;

`