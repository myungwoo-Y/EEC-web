import React from 'react';
import { FieldValues, UseFormRegister, UseFormWatch } from 'react-hook-form';
import Select from '../Select';
import Input from '../Input';
import tableStyles from '../../components/table/Table.module.scss';
import classNames from 'classnames';
import { classOrderList } from '@/model/classOrder';
import { CertificateState } from '@/model/report';

type BasisProps = {
  register: UseFormRegister<Record<string, any>>;
  watch?: UseFormWatch<FieldValues>;
};

function Basis({ register, watch }: BasisProps) {
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
                <Select className="w-24" register={register} watch={watch} name="1">
                  <option value="">
                    년도선택
                  </option>
                  <option value="2023">2023</option>
                  <option value="2024">2024</option>
                  <option value="2025">2025</option>
                  <option value="2026">2026</option>
                  <option value="2027">2027</option>
                </Select>
                <Select className="w-24" register={register} watch={watch} name="2">
                  <option value="">
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
            <td className="w-124">
              <Select register={register} watch={watch} name="3">
                <option value="">
                  선택
                </option>
                <option value={CertificateState.DONE}>이수완료</option>
                <option value={CertificateState.ON_GOING}>이수증</option>
                <option value={CertificateState.NONE}>해당없음</option>
              </Select>
            </td>
            <td className="w-96">
              <Input type="text" register={register} name="4" />
            </td>
          </tr>
          <tr>
            <td>
              <div className="flex items-center justify-center gap-1">
                실무교육
                <Select className="w-24" register={register} watch={watch} name="5">
                  <option value="">
                    년도선택
                  </option>
                  <option value="2023">2023</option>
                  <option value="2024">2024</option>
                  <option value="2025">2025</option>
                  <option value="2026">2026</option>
                  <option value="2027">2027</option>
                </Select>
                <Select className="w-24" register={register} watch={watch} name="6">
                  <option value="">
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
              <Select register={register} watch={watch} name="7">
                <option value="">
                  선택
                </option>
                <option value={CertificateState.DONE}>이수완료</option>
                <option value={CertificateState.ON_GOING}>이수증</option>
                <option value={CertificateState.NONE}>해당없음</option>
              </Select>
            </td>
            <td>
              <Input type="text" register={register} name="8" />
            </td>
          </tr>
          <tr>
            <td>기타</td>
            <td>
              <Input type="text" register={register} name="9"  />
            </td>
            <td>
              <Input type="text" register={register} name="10" />
            </td>
          </tr>
          <tr>
            <td>기타</td>
            <td>
              <Input type="text" register={register} name="11"  />
            </td>
            <td>
              <Input type="text" register={register} name="12" />
            </td>
            <td>
              <Input type="text" register={register} name="13" />
            </td>
          </tr>
          <tr>
            <td rowSpan={3}>
              기타 <br /> (사이버교육등)
            </td>
            <td>역학조사 관련</td>
            <td>
              <div className="flex justify-center items-center gap-2">
                <Input type="number" className="w-12" register={register} name="14" /> 회
              </div>
            </td>
            <td>
              <Input type="text" register={register} name="15" />
            </td>
          </tr>
          <tr>
            <td>가축방역 관련</td>
            <td>
              <div className="flex justify-center items-center gap-2">
                <Input type="number" className="w-12" register={register} name="16" /> 회
              </div>
            </td>
            <td>
              <Input type="text" register={register} name="17" />
            </td>
          </tr>
          <tr>
            <td>기타</td>
            <td>
              <div className="flex justify-center items-center gap-2">
                <Input type="number" className="w-12" register={register} name="18" /> 회
              </div>
            </td>
            <td>
              <Input type="text" register={register} name="19" />
            </td>
          </tr>
          <tr>
            <td rowSpan={3}>
              워크숍 <br /> 참석
            </td>
            <td colSpan={2}>역학조사 관련</td>
            <td>
              <div className="flex justify-center items-center gap-2">
                <Input type="number" className="w-12" register={register} name="20"/> 회
              </div>
            </td>
            <td>
              <Input type="text" register={register} name="21" />
            </td>
          </tr>
          <tr>
            <td colSpan={2}>가축방역 관련</td>
            <td>
              <div className="flex justify-center items-center gap-2">
                <Input type="number" className="w-12" register={register} name="22" /> 회
              </div>
            </td>
            <td>
              <Input type="text" register={register} name="23" />
            </td>
          </tr>
          <tr>
            <td colSpan={2}>기타</td>
            <td>
              <div className="flex justify-center items-center gap-2">
                <Input type="number" register={register} name="24" className="w-12" /> 회
              </div>
            </td>
            <td>
              <Input type="text" register={register} name="25" />
            </td>
          </tr>
          <tr>
            <td rowSpan={7}>현장 활동</td>
            <td colSpan={2}>규정,지침 등 제.개정</td>
            <td>
              <div className="flex justify-center items-center gap-2">
                <Input type="number" className="w-12" register={register} name="26"/> 회
              </div>
            </td>
            <td>
              <Input type="text" register={register} name="27" />
            </td>
          </tr>
          <tr>
            <td colSpan={2}>세미나.학회 등 발표</td>
            <td>
              <div className="flex justify-center items-center gap-2">
                <Input type="number" className="w-12" register={register} name="28" /> 회
              </div>
            </td>
            <td>
              <Input type="text" register={register} name="29" />
            </td>
          </tr>
          <tr>
            <td colSpan={2}>현장 역학조사 </td>
            <td>
              <div className="flex justify-center items-center gap-2">
                <Input type="number" className="w-12" register={register} name="30" /> 회 
                <span>/</span>
                <Input type="number" className="w-12" register={register} name="31" /> 일
              </div>
            </td>
            <td>
              <Input type="text" register={register} name="32" />
            </td>
          </tr>
          <tr>
            <td colSpan={2}>현장 역학조사보고서 작성 </td>
            <td>
              <div className="flex justify-center items-center gap-2">
                <Input type="number" className="w-12" register={register} name="33" /> 회
              </div>
            </td>
            <td>
              <Input type="text" register={register} name="34" />
            </td>
          </tr>
          <tr>
            <td colSpan={2}>역학조사 관련 공무국외여행 </td>
            <td>
              <div className="flex justify-center items-center gap-2">
                <Input type="number" className="w-12" register={register} name="35" /> 회
              </div>
            </td>
            <td>
              <Input type="text" register={register} name="36"/>
            </td>
          </tr>
          <tr>
            <td colSpan={2}>보도자료 작성 </td>
            <td>
              <div className="flex justify-center items-center gap-2">
                <Input type="number" className="w-12" register={register} name="37" /> 회
              </div>
            </td>
            <td>
              <Input type="text" register={register} name="38" />
            </td>
          </tr>
          <tr>
            <td colSpan={2}>역학조사 분석관련 회의 참석 </td>
            <td>
              <div className="flex justify-center items-center gap-2">
                <Input type="number" className="w-12" register={register} name="39" /> 회
              </div>
            </td>
            <td>
              <Input type="text" register={register} name="40" />
            </td>
          </tr>
          <tr>
            <td>기타</td>
            <td colSpan={2}>논문</td>
            <td>
              <div className="flex justify-center items-center gap-2">
                <Input type="number" className="w-12" register={register} name="41" /> 회
              </div>
            </td>
            <td>
              <Input type="text" register={register} name="42" />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default Basis;
