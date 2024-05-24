import { mdiChartTimelineVariant, mdiUpload } from '@mdi/js';
import Head from 'next/head';
import React, { ReactElement, useEffect, useState } from 'react';
import 'react-toastify/dist/ReactToastify.min.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import dayjs from 'dayjs';

import CardBox from '../../components/CardBox';
import LayoutAuthenticated from '../../layouts/Authenticated';
import SectionMain from '../../components/SectionMain';
import SectionTitleLineWithButton from '../../components/SectionTitleLineWithButton';
import { getPageTitle } from '../../config';

import { Field, Form, Formik } from 'formik';
import FormField from '../../components/FormField';
import BaseDivider from '../../components/BaseDivider';
import BaseButtons from '../../components/BaseButtons';
import BaseButton from '../../components/BaseButton';
import FormCheckRadio from '../../components/FormCheckRadio';
import FormCheckRadioGroup from '../../components/FormCheckRadioGroup';
import FormFilePicker from '../../components/FormFilePicker';
import FormImagePicker from '../../components/FormImagePicker';
import { SelectField } from '../../components/SelectField';
import { SelectFieldMany } from '../../components/SelectFieldMany';
import { SwitchField } from '../../components/SwitchField';
import { RichTextField } from '../../components/RichTextField';

import { update, fetch } from '../../stores/enrollments/enrollmentsSlice';
import { useAppDispatch, useAppSelector } from '../../stores/hooks';
import { useRouter } from 'next/router';
import { saveFile } from '../../helpers/fileSaver';
import dataFormatter from '../../helpers/dataFormatter';
import ImageField from '../../components/ImageField';

const EditEnrollments = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const initVals = {
    student: '',

    course: '',

    enrolled_at: new Date(),

    payment_status: '',
  };
  const [initialValues, setInitialValues] = useState(initVals);

  const { enrollments } = useAppSelector((state) => state.enrollments);

  const { enrollmentsId } = router.query;

  useEffect(() => {
    dispatch(fetch({ id: enrollmentsId }));
  }, [enrollmentsId]);

  useEffect(() => {
    if (typeof enrollments === 'object') {
      setInitialValues(enrollments);
    }
  }, [enrollments]);

  useEffect(() => {
    if (typeof enrollments === 'object') {
      const newInitialVal = { ...initVals };

      Object.keys(initVals).forEach(
        (el) => (newInitialVal[el] = enrollments[el] || ''),
      );

      setInitialValues(newInitialVal);
    }
  }, [enrollments]);

  const handleSubmit = async (data) => {
    await dispatch(update({ id: enrollmentsId, data }));
    await router.push('/enrollments/enrollments-list');
  };

  return (
    <>
      <Head>
        <title>{getPageTitle('Edit enrollments')}</title>
      </Head>
      <SectionMain>
        <SectionTitleLineWithButton
          icon={mdiChartTimelineVariant}
          title={'Edit enrollments'}
          main
        >
          {''}
        </SectionTitleLineWithButton>
        <CardBox>
          <Formik
            enableReinitialize
            initialValues={initialValues}
            onSubmit={(values) => handleSubmit(values)}
          >
            <Form>
              <FormField label='Student' labelFor='student'>
                <Field
                  name='student'
                  id='student'
                  component={SelectField}
                  options={initialValues.student}
                  itemRef={'users'}
                  showField={'firstName'}
                ></Field>
              </FormField>

              <FormField label='Course' labelFor='course'>
                <Field
                  name='course'
                  id='course'
                  component={SelectField}
                  options={initialValues.course}
                  itemRef={'courses'}
                  showField={'title'}
                ></Field>
              </FormField>

              <FormField label='EnrolledAt'>
                <DatePicker
                  dateFormat='yyyy-MM-dd hh:mm'
                  showTimeSelect
                  selected={
                    initialValues.enrolled_at
                      ? new Date(
                          dayjs(initialValues.enrolled_at).format(
                            'YYYY-MM-DD hh:mm',
                          ),
                        )
                      : null
                  }
                  onChange={(date) =>
                    setInitialValues({ ...initialValues, enrolled_at: date })
                  }
                />
              </FormField>

              <FormField label='PaymentStatus' labelFor='payment_status'>
                <Field
                  name='PaymentStatus'
                  id='PaymentStatus'
                  component='select'
                >
                  <option value='paid'>paid</option>

                  <option value='pending'>pending</option>

                  <option value='cancelled'>cancelled</option>
                </Field>
              </FormField>

              <BaseDivider />
              <BaseButtons>
                <BaseButton type='submit' color='info' label='Submit' />
                <BaseButton type='reset' color='info' outline label='Reset' />
                <BaseButton
                  type='reset'
                  color='danger'
                  outline
                  label='Cancel'
                  onClick={() => router.push('/enrollments/enrollments-list')}
                />
              </BaseButtons>
            </Form>
          </Formik>
        </CardBox>
      </SectionMain>
    </>
  );
};

EditEnrollments.getLayout = function getLayout(page: ReactElement) {
  return (
    <LayoutAuthenticated permission={'UPDATE_ENROLLMENTS'}>
      {page}
    </LayoutAuthenticated>
  );
};

export default EditEnrollments;
