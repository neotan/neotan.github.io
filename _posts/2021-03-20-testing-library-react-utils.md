---
layout: post
title: Testing React, hooks, snapshots, styled-components, react-router and sessionStorage with testing-library
tags: jest testing-library hooks unit-test UT
date: 2021-03-20
---

* 
{:toc}

Getting testing-library and jest work with my React code is quit time consuming, shared here to help people who is facing this kind of hard time. I'm trying to avoid long-wind and make things simple and followable. Feel free comment or ask questions. Happy coding! :)

## Testing environment configuration

```js

// setupTests.js

/* eslint-disable */
import '@testing-library/react/dont-cleanup-after-each';
import '@testing-library/jest-dom/extend-expect';
import 'jest-styled-components';
import 'mock-local-storage'
import React from 'react'
import Adapter from 'enzyme-adapter-react-16'
import {configure, shallow, mount} from 'enzyme'
import {render} from '@testing-library/react';
import {ThemeConsumer, ThemeProvider} from "styled-components";
import {QueryClientProvider, QueryClient} from "react-query";
import {Router} from "react-router-dom";
import {createBrowserHistory} from "history";
import defaultTheme from "@utils/styles";

configure({adapter: new Adapter()})
```
### for testing Ant Design
```js
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

```
### for testing sessionStorage
```js
Object.defineProperty(window, 'sessionStorage', {
  writable: true,
  value: global.localStorage
})

```
### for bypassing Suspense() and lazy() API when testing components
```js
jest.mock('react', () => {
  const React = jest.requireActual('react');
  React.Suspense = ({children}) => children;
  React.lazy = (factory) => factory()
  return React;
});

```
### for freezing system date time, so that won't be botherred by date time presentation diff when taking snapshots
```js
jest.useFakeTimers('modern'); // tell Jest to use a different timer implementation.
jest.setSystemTime(new Date('2222-12-22T22:22:22+08:00').getTime()); // Set a static time for snapshot

```
### for testing styled-components with theme
```js
export const shallowWithTheme = (children, theme = defaultTheme) => {
  ThemeConsumer._currentValue = theme;
  return shallow(children);
};

```
### for testing styled-components and react-query
```js
const defaultQueryClient = new QueryClient()
export const renderWithThemeAndQuery = (children,
                                        theme = defaultTheme,
                                        queryClient = defaultQueryClient) => {
  return render(
    <ThemeProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </ThemeProvider>
  )
};

```
### for testing react-router-dom
```js
const defaultHistory = createBrowserHistory();
export const renderWithRouter = (children, history = defaultHistory) => {
  return {
    ...renderWithThemeAndQuery(<Router history={history}>{children}</Router>),
    history
  }
};

```
## Test case examples

### react-query hooks

```js
import { QueryClient, QueryClientProvider } from 'react-query';

function updatePost(url, title, content) {
  return axios.put(url, { title, content });
}

function useFetchAllPosts(query) {
  return useQuery(
    ['allPosts', query],
    () => fetchTestAppointments(query), {
      cacheTime: 3000,
      retry: 1,
      refetchOnWindowFocus: false,
    },
  );
}

// REF: https://react-query.tanstack.com/examples/optimistic-updates
function useSavePost(apiUrl) {
  const client = useQueryClient();
  return useMutation(
    ['savePost', apiUrl],
    ({
      url, title, content
    }) => useSavePost(url, title, content),
    {
      onSuccess(res) {
        client.refetchQueries('allPosts'); // reload all posts from backend
      },
    },
  );
}

const defaultQueryClient = new QueryClient();
const wrapper = ({ children }) => (
  <QueryClientProvider client={defaultQueryClient}>
    {children}
  </QueryClientProvider>
);

describe('useSavePost', () => {
  const apiUrl = 'my url';

  it('should has proper props', async () => {
    const { result, waitForNextUpdate } = renderHook(() => useSavePost(apiUrl), { wrapper });
    result.current.mutate({
      url, title, content
    });
    await waitForNextUpdate();
    expect(updatePost).toBeCalledWith(url, qu);
  });
});

```

## Bonus
### query-extensions - npm

https://www.npmjs.com/package/query-extensions

This package enhances testing-library with locating node with css selectors

Example:
```js
  screen.getBySelector(".company-logo");
  screen.queryBySelector(".company-logo")
```
