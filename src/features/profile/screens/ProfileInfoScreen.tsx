import React, {useEffect} from 'react';
import styled from 'rn-css';
import {ScrollView} from 'react-native';
import {AppText} from '../../../ui/AppText';
import {getString} from '../../../utils/locales/string';
import HeaderBar from '../../../ui/HeaderBar';
import AppInput from '../../../ui/AppInput';
import {zodResolver} from '@hookform/resolvers/zod';
import {useForm} from 'react-hook-form';
import {z} from 'zod';
import {Controller} from 'react-hook-form';
import {language} from '../../../utils/contsants';
import AppSelect from '../../../ui/AppSelect';
import AppButton from '../../../ui/AppButton';
import {asyncStorageFunctions} from '../../../utils/asyncStorage';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useAppDispatch, useAppSelector} from '../../../redux/store';
import {UserActions} from '../../../redux/slice/user-slice';

const schema = z.object({
  name: z
    .string()
    .min(1, getString('error', 'toShort'))
    .max(30, getString('error', 'toLong'))
    .nonempty(getString('error', 'required')),
  description: z
    .string()
    .min(1, getString('error', 'toShort'))
    .max(300, getString('error', 'toLong'))
    .nonempty(getString('error', 'required')),
  age: z.string().refine(
    item => {
      if (Number(item) < 1 || Number(item) > 100) {
        return false;
      } else {
        return true;
      }
    },
    {message: getString('error', 'age')},
  ),
  appLanguage: z.string().nonempty(getString('error', 'required')),
});

const languages = [
  {
    value: language.FR,
    label: getString('languages', 'fr'),
  },
  {
    value: language.PL,
    label: getString('languages', 'pl'),
  },
  {
    value: language.ES,
    label: getString('languages', 'es'),
  },
  {
    value: language.EN,
    label: getString('languages', 'en'),
  },
];

const ProfileInfoScreen = () => {
  const editMode = useRoute().params.editMode;
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const userData = useAppSelector(state => state.user.userInfo);
  const appLanguage = useAppSelector(state => state.user.userLanguage);

  const {control, handleSubmit, setValue} = useForm({
    defaultValues: {
      name: '',
      description: '',
      age: '',
      appLanguage: '',
    },
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: asyncStorageFunctions.UserInfo) => {
    const submitDataRedux = {
      name: data.name,
      desc: data.description,
      age: data.age,
    };
    const submitData = {
      name: data.name,
      description: data.description,
      age: data.age,
      appLanguage: data.appLanguage,
    };
    asyncStorageFunctions.setUserInfo(submitData);
    dispatch(UserActions.setUserInfo(submitDataRedux));
    dispatch(UserActions.setUserLanguage(data.appLanguage));
    navigation.goBack();
  };

  useEffect(() => {
    if (userData) {
      setValue('name', userData.name);
      setValue('description', userData.desc);
      setValue('age', userData.age);
      setValue('appLanguage', appLanguage);
    }
  }, [userData]);

  return (
    <>
      <HeaderBar
        text={
          editMode
            ? getString('profile', 'editProfile')
            : getString('profile', 'createProfile')
        }
      />
      <Wrapper contentContainerStyle={{alignItems: 'center'}}>
        <Label>
          <TextWrapper>
            <AppText>{getString('profile', 'nick')}</AppText>
          </TextWrapper>
          <Controller
            control={control}
            name="name"
            render={({field: {onChange, value}, fieldState: {error}}) => {
              return (
                <AppInput
                  error={error?.message}
                  onChangeText={onChange}
                  value={value}
                />
              );
            }}
          />
        </Label>
        <Label>
          <TextWrapper>
            <AppText>{getString('profile', 'age')}</AppText>
          </TextWrapper>
          <Controller
            control={control}
            name="age"
            render={({field: {onChange, value}, fieldState: {error}}) => {
              return (
                <AppInput
                  error={error?.message}
                  keyboardType="numeric"
                  onChangeText={onChange}
                  value={value}
                />
              );
            }}
          />
        </Label>
        <Label>
          <TextWrapper>
            <AppText>{getString('profile', 'description')}</AppText>
          </TextWrapper>
          <Controller
            control={control}
            name="description"
            render={({field: {onChange, value}, fieldState: {error}}) => {
              return (
                <AppInput
                  error={error?.message}
                  onChangeText={onChange}
                  value={value}
                />
              );
            }}
          />
        </Label>
        <Label>
          <TextWrapper>
            <AppText>{getString('profile', 'language')}</AppText>
          </TextWrapper>
          <Controller
            control={control}
            name="appLanguage"
            render={({field: {onChange, value}, fieldState: {error}}) => {
              return (
                <AppSelect
                  error={error?.message}
                  onSelect={e => setValue('appLanguage', e.value)}
                  data={languages}
                  selectedValue={value}
                />
              );
            }}
          />
        </Label>
        <Box>
          <AppButton
            onPress={handleSubmit(onSubmit)}
            text={getString('profile', 'save')}
          />
        </Box>
      </Wrapper>
    </>
  );
};

const Box = styled.View`
  width: 60%;
  margin-top: 30px;
`;
const TextWrapper = styled.View`
  margin-bottom: 10px;
`;
const Wrapper = styled.ScrollView``;
const Label = styled.View`
  padding: 15px;
  width: 100%;
  height: 100px;
`;

export default ProfileInfoScreen;
