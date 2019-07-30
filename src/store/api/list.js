import { apiService } from './index';
import { defaultUrl } from './config';

export const getList = (token, projectId, listId) => {
  return apiService({
    method: 'get',
    url: `${defaultUrl}/projects/${projectId}/lists/${listId}`,
    headers: {
      authorization: token,
      'Content-Type': 'application/json'
    }
  });
};

export const getAllLists = (token, projectId) => {
  return apiService({
    method: 'get',
    url: `${defaultUrl}/projects/${projectId}/lists/`,
    headers: {
      authorization: token,
      'Content-Type': 'application/json'
    }
  });
};

export const createList = (token, projectId, listTitle) => {
  return apiService({
    method: 'post',
    url: `${defaultUrl}/projects/${projectId}/lists`,
    data: {
      listTitle
    },
    headers: {
      authorization: token,
      'Content-Type': 'application/json'
    }
  });
};

export const deleteList = (token, projectId, listId) => {
  return apiService({
    method: 'delete',
    url: `${defaultUrl}/projects/${projectId}/lists/${listId}`,
    headers: {
      authorization: token,
      'Content-Type': 'application/json'
    }
  });
};

export const updateList = (token, projectId, listId, listData) => {
  return apiService({
    method: 'patch',
    url: `${defaultUrl}/projects/${projectId}/lists/${listId}`,
    data: {
      ...listData
    },
    headers: {
      authorization: token,
      'Content-Type': 'application/json'
    }
  });
};
