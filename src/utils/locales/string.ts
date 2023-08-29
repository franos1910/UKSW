import {pl} from './pl';
import {en} from './en';
import {fr} from './fr';
import {es} from './es';
import {language as lng} from '../contsants';
import store from '../../redux/store';

export const initLanguage = () => {
  console.log('a');
};

export const getString = <AreaName extends keyof typeof en>(
  area: AreaName,
  stringName: keyof (typeof en)[AreaName],
) => {
  const language = store.getState().user.userLanguage;
  if (language === 'en') {
    return en[area][stringName];
  }
  if (language === 'pl') {
    return pl[area][stringName];
  }
  if (language === 'es') {
    return es[area][stringName];
  }
  if (language === 'fr') {
    return fr[area][stringName];
  }

  return en[area][stringName];
};

export type StringArea = keyof typeof en;
