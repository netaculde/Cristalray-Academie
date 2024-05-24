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

import { update, fetch } from '../../stores/live_sessions/live_sessionsSlice';
import { useAppDispatch, useAppSelector } from '../../stores/hooks';
import { useRouter } from 'next/router';
import { saveFile } from '../../helpers/fileSaver';
import dataFormatter from '../../helpers/dataFormatter';
import ImageField from '../../components/ImageField';

const EditLive_sessions = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const initVals = {
    course: '',

    scheduled_time: new Date(),

    platform: '',

    link: '',
  };
  const [initialValues, setInitialValues] = useState(initVals);

  const { live_sessions } = useAppSelector((state) => state.live_sessions);

  const { live_sessionsId } = router.query;

  useEffect(() => {
    dispatch(fetch({ id: live_sessionsId }));
  }, [live_sessionsId]);

  useEffect(() => {
    if (typeof live_sessions === 'object') {
      setInitialValues(live_sessions);
    }
  }, [live_sessions]);

  useEffect(() => {
    if (typeof live_sessions === 'object') {
      const newInitialVal = { ...initVals };

      Object.keys(initVals).forEach(
        (el) => (newInitialVal[el] = live_sessions[el] || ''),
      );

      setInitialValues(newInitialVal);
    }
  }, [live_sessions]);

  const handleSubmit = async (data) => {
    await dispatch(update({ id: live_sessionsId, data }));
    await router.push('/live_sessions/live_sessions-list');
  };

  return (
    <>
      <Head>
        <title>{getPageTitle('Edit live_sessions')}</title>
      </Head>
      <SectionMain>
        <SectionTitleLineWithButton
          icon={mdiChartTimelineVariant}
          title={'Edit live_sessions'}
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

              <FormField label='ScheduledTime'>
                <DatePicker
                  dateFormat='yyyy-MM-dd hh:mm'
                  showTimeSelect
                  selected={
                    initialValues.scheduled_time
                      ? new Date(
                          dayjs(initialValues.scheduled_time).format(
                            'YYYY-MM-DD hh:mm',
                          ),
                        )
                      : null
                  }
                  onChange={(date) =>
                    setInitialValues({ ...initialValues, scheduled_time: date })
                  }
                />
              </FormField>

              <FormField label='Platform'>
                <Field name='platform' placeholder='Platform' />
              </FormField>

              <FormField label='Link'>
                <Field name='link' placeholder='Link' />
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
                  onClick={() =>
                    router.push('/live_sessions/live_sessions-list')
                  }
                />
              </BaseButtons>
            </Form>
          </Formik>
        </CardBox>
      </SectionMain>
    </>
  );
};

EditLive_sessions.getLayout = function getLayout(page: ReactElement) {
  return (
    <LayoutAuthenticated permission={'UPDATE_LIVE_SESSIONS'}>
      {page}
    </LayoutAuthenticated>
  );
};

export default EditLive_sessions;
