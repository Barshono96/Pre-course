'use strict';

const fs = require('fs');
require('chai').should();

const options = {
  resources: 'usable',
  runScripts: 'dangerously',
  url: 'file://' + __dirname,
};

const html = fs.readFileSync(__dirname + '/../index.html', 'utf8');
require('jsdom-global')(html, options);

const $ = require('jquery');
const user = require('../lib/user.json');

describe('Instatags', () => {
  before(done => (window.pageIsReady = done)); // Start tests only once all content is rendered on page

  it('should start calling renderUserMedia', () => {
    $('#user img').attr('src').should.equal(user.data.profile_picture);
  });

  it('should render the username on the page', () => {
    $('#user h1').text().should.equal(user.data.username);
  });

  it('should render the user data on the page', () => {
    $('#num-followers').text().should.equal(user.data.counts.followed_by);
    $('#num-follows').text().should.equal(user.data.counts.follows);
    $('#num-media').text().should.equal(user.data.counts.media);
  });

  it('should render the correct number of media', () => {
    $('.user-media-item').css('background-image').should.exist;
    $('.user-media-item').length.should.equal(25);
  });

  it('should render tags filtered by minimum frequency of 2', () => {
    const first = $('.tag-list ul li a')[0].text;
    const count = first.toLowerCase().includes('all') ? 18 : 17;
    $('.tag-list ul li').length.should.equal(count);
  });

  it('should filter pictures by sorted tags', () => {
    const freq1 = +$('.tag-list ul li a')[0].text.match(/[0-9]+/g);
    const freq2 = +$('.tag-list ul li a')[1].text.match(/[0-9]+/g);
    $('.tag-list ul li a')[0].click();
    $('.user-media-item').length.should.equal(freq1);
    $('.tag-list ul li a')[1].click();
    $('.user-media-item').length.should.equal(freq2);
  });
});
