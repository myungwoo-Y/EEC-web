import React from 'react';
import { UseFormRegister } from 'react-hook-form';
import Select from '../Select';
import Input from '../Input';
import tableStyles from '../../components/table/Table.module.scss';
import classNames from 'classnames';
import { classOrderList } from '@/model/classOrder';
import { CertificateState } from '@/model/report';

type BasisProps = {
  register?: UseFormRegister<Record<string, any>>;
};

function Basis({ register }: BasisProps) {
  return (
    <div className="mt-7">
      <p className="text-xl font-semibold">관련근거</p>
      <table className={classNames(tableStyles.normal, 'w-full mt-2 mb-10')}>
        <thead>
          <tr className="border-t-2 border-t-black border-b-[1px] bg-gray-50">
            <th className="border-gray-300 border-[1px] border-t-black py-2 w-24">
              근거 및 <br />
              수료요건거부
            </th>
            <th className="border-gray-300 border-[1px] border-t-black">
              구분
            </th>
            <th className="border-gray-300 border-[1px] border-t-black w-96">
              구분
            </th>
            <th className="border-gray-300 border-[1px] border-t-black">
              분기실적
            </th>
            {/* <th className="border-gray-300 border-[1px] border-t-black">
              누적실적
            </th> */}
            <th className="border-gray-300 border-[1px] border-t-black w-52">
              분기실적 내용 <br />
              (제목, 기간등 구체적으로 기입)
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td rowSpan={7}>수료요건</td>
            <td rowSpan={3}>교육참석</td>
            <td>
              <div className="flex items-center justify-center gap-1">
                기본교육
                <Select className="w-24" register={register} name="basicY">
                  <option value="" disabled>
                    년도선택
                  </option>
                  <option value="2023">2023</option>
                  <option value="2024">2024</option>
                  <option value="2025">2025</option>
                  <option value="2026">2026</option>
                  <option value="2027">2027</option>
                </Select>
                <Select className="w-24" register={register} name="basicO">
                  <option value="" disabled>
                    기수선택
                  </option>
                  {classOrderList.map((classOrder, idx) => (
                    <option key={idx} value={idx + 1}>
                      {classOrder}
                    </option>
                  ))}
                </Select>
              </div>
            </td>
            <td className="w-64">
              <Select register={register} name="basicS">
                <option value="" disabled>
                  선택
                </option>
                <option value={CertificateState.DONE}>이수완료</option>
                <option value={CertificateState.ON_GOING}>이수증</option>
                <option value={CertificateState.NONE}>해당없음</option>
              </Select>
            </td>
            <td className="w-96">
              <Input type="text" name="basicC" />
            </td>
          </tr>
          <tr>
            <td>
              <div className="flex items-center justify-center gap-1">
                실무교육
                <Select className="w-24" register={register} name="pracY">
                  <option value="" disabled>
                    년도선택
                  </option>
                  <option value="2023">2023</option>
                  <option value="2024">2024</option>
                  <option value="2025">2025</option>
                  <option value="2026">2026</option>
                  <option value="2027">2027</option>
                </Select>
                <Select className="w-24" name="pracO">
                  <option value="" disabled>
                    기수선택
                  </option>
                  {classOrderList.map((classOrder, idx) => (
                    <option key={idx} value={idx + 1}>
                      {classOrder}
                    </option>
                  ))}
                </Select>
              </div>
            </td>
            <td>
              <Select name="prac-s">
                <option value="" disabled>
                  선택
                </option>
                <option value={CertificateState.DONE}>이수완료</option>
                <option value={CertificateState.ON_GOING}>이수증</option>
                <option value={CertificateState.NONE}>해당없음</option>
              </Select>
            </td>
            <td>
              <Input type="text" register={register} name="pracC" />
            </td>
          </tr>
          <tr>
            <td>기타</td>
            <td>
              <Input type="text" register={register} name="attendEtcS"  />
            </td>
            <td>
              <Input type="text" register={register} name="attendEtcC" />
            </td>
          </tr>
          <tr>
            <td>기타</td>
            <td>
              <Input type="text" register={register} name="etcI"  />
            </td>
            <td>
              <Input type="text" register={register} name="etcS" />
            </td>
            <td>
              <Input type="text" register={register} name="etcC" />
            </td>
          </tr>
          <tr>
            <td rowSpan={3}>
              기타 <br /> (사이버교육등)
            </td>
            <td>역학조사 관련</td>
            <td>
              <div className="flex justify-center items-center gap-2">
                <Input type="number" className="w-6" register={register} name="etcI" /> 회
              </div>
            </td>
            <td>
              <Input type="text" />
            </td>
          </tr>
          <tr>
            <td>가축방역 관련</td>
            <td>
              <div className="flex justify-center items-center gap-2">
                <Input type="number" className="w-6" /> 회
              </div>
            </td>
            <td>
              <Input type="text" />
            </td>
          </tr>
          <tr>
            <td>기타</td>
            <td>
              <div className="flex justify-center items-center gap-2">
                <Input type="number" className="w-6" /> 회
              </div>
            </td>
            <td>
              <Input type="text" />
            </td>
          </tr>
          <tr>
            <td rowSpan={3}>
              워크숍 <br /> 참석
            </td>
            <td colSpan={2}>역학조사 관련</td>
            <td>
              <div className="flex justify-center items-center gap-2">
                <Input type="number" className="w-6" /> 회
              </div>
            </td>
            <td>
              <Input type="text" />
            </td>
          </tr>
          <tr>
            <td colSpan={2}>가축방역 관련</td>
            <td>
              <div className="flex justify-center items-center gap-2">
                <Input type="number" className="w-6" /> 회
              </div>
            </td>
            <td>
              <Input type="text" />
            </td>
          </tr>
          <tr>
            <td colSpan={2}>기타</td>
            <td>
              <div className="flex justify-center items-center gap-2">
                <Input type="number" className="w-6" /> 회
              </div>
            </td>
            <td>
              <Input type="text" />
            </td>
          </tr>
          <tr>
            <td rowSpan={7}>현장 활동</td>
            <td colSpan={2}>규정,지침 등 제.개정</td>
            <td>
              <div className="flex justify-center items-center gap-2">
                <Input type="number" className="w-6" /> 회
              </div>
            </td>
            <td>
              <Input type="text" />
            </td>
          </tr>
          <tr>
            <td colSpan={2}>세미나.학회 등 발표</td>
            <td>
              <div className="flex justify-center items-center gap-2">
                <Input type="number" className="w-6" /> 회
              </div>
            </td>
            <td>
              <Input type="text" />
            </td>
          </tr>
          <tr>
            <td colSpan={2}>현장 역학조사 </td>
            <td>
              <div className="flex justify-center items-center gap-2">
                <Input type="number" className="w-6" /> 회
              </div>
            </td>
            <td>
              <Input type="text" />
            </td>
          </tr>
          <tr>
            <td colSpan={2}>현장 역학조사보고서 작성 </td>
            <td>
              <div className="flex justify-center items-center gap-2">
                <Input type="number" className="w-6" /> 회
              </div>
            </td>
            <td>
              <Input type="text" />
            </td>
          </tr>
          <tr>
            <td colSpan={2}>역학조사 관련 공무국외여행 </td>
            <td>
              <div className="flex justify-center items-center gap-2">
                <Input type="number" className="w-6" /> 회
              </div>
            </td>
            <td>
              <Input type="text" />
            </td>
          </tr>
          <tr>
            <td colSpan={2}>보도자료 작성 </td>
            <td>
              <div className="flex justify-center items-center gap-2">
                <Input type="number" className="w-6" /> 회
              </div>
            </td>
            <td>
              <Input type="text" />
            </td>
          </tr>
          <tr>
            <td colSpan={2}>역학조사 분석관련 회의 참석 </td>
            <td>
              <div className="flex justify-center items-center gap-2">
                <Input type="number" className="w-6" /> 회
              </div>
            </td>
            <td>
              <Input type="text" />
            </td>
          </tr>
          <tr>
            <td>기타</td>
            <td colSpan={2}>논문</td>
            <td>
              <div className="flex justify-center items-center gap-2">
                <Input type="number" className="w-6" /> 회
              </div>
            </td>
            <td>
              <Input type="text" />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default Basis;
