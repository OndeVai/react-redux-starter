export const ERROR_400 = 'ERROR_400';
export const ERROR_404 = 'ERROR_404';
export const ERROR_500 = 'ERROR_500';

export function resolveType(status) {

  if(status==400){
    return ERROR_400;
  }

  if(status==404){
    return ERROR_404;
  }

  if(status >= 500 && status < 600)
  {
    return ERROR_500;
  }

  return null;
}

