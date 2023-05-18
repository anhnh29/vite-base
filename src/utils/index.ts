/* eslint-disable @typescript-eslint/no-dynamic-delete */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { forIn, isArray, isEmpty, isObject } from 'lodash-es'
import queryString from 'query-string'

export const removeEmptyValueInObject = (obj: any) => {
  for (const propName in obj) {
    if (isEmpty(obj[propName])) {
      delete obj[propName]
    }
  }
  return obj
}

export const objectToQueryString = (obj: Object, options = {}) =>
  queryString.stringify(obj, {
    arrayFormat: 'bracket',
    ...options,
  })

export const isEmptyPagination = (pagination: object) => {
  return Object.entries(pagination ?? {}).length === 0
}

export const queryStringToObject = (query: string, options = {}) => {
  return queryString.parse(query, {
    arrayFormat: 'bracket',
    ...options,
  })
}

export const sortInforWithDir = (
  field: string,
  sorts: Array<{ field: string; order: 'asc' | 'desc' }>
) => {
  const sort = sorts?.find((el) => el.field === field)
  return sort && (sort.order === 'asc' ? 'ascend' : 'descend')
}

export const handleParseObject = (object: object): object => {
  const queries: any = {}
  forIn(object, function (value: any, key) {
    if (isArray(value)) {
      const filters: any = []
      value.forEach((el: any) => {
        filters.push(isObject(el) ? objectToQueryString(el) : el)
        queries[key] = filters
      })
    } else {
      queries[key] = isObject(value) ? objectToQueryString(value) : value
    }
  })
  return queries
}
