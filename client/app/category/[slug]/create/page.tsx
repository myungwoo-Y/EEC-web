"use client"

import Input from '@/components/Input'
import Select from '@/components/Select'
import React, { useState } from 'react'

type Props = {
  params: {
    slug: string;
  };
};


function Page({params: { slug }}: Props) {
  
  const [temp, setTemp] = useState<string>('');
  return (
    <div>
      <table>
        <tbody>
          <tr>
            <td>제목</td>
            <td>
              <Input value={temp} type="text" />
            </td>
          </tr>
          <tr>
            <td>공개여부</td>
            <td>
              <Select>
                <option>hello</option>
              </Select>
            </td>
          </tr>
          <tr>
            <td>첨부파일</td>
            <td>
              <input type="file"/>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default Page;
