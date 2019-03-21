import React from 'react';

declare module 'react-apollo' {
  declare var exports: any;
  declare export class Query extends React.Component{}
  declare export class Mutation extends React.Component{}
}
