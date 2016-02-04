/* global */
'use strict';

import Hateoas from 'express-hateoas';

import express from './express';

export default new Hateoas(express);
