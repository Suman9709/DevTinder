import React, { useEffect, useState } from 'react'
import { BASE_URL } from './constant'
import { useDispatch, useSelector } from 'react-redux'
import { addFeed } from '../Utils/feedSlice';
import axios from 'axios';
import UserCard from './UserCard';

const Feed = () => {
  const [feeds, setFeeds] = useState('')

  const dispatch = useDispatch();

  const feed = useSelector((store) => store.feed);
  const getFeed = async () => {
    if (feed) return;
    try {
      const response = await axios.get(BASE_URL + "/feed", {
        withCredentials: true,
      });
      // console.log("feed: ", response.data);

      dispatch(addFeed(response.data)); // this will add the feed to the store
    } catch (error) {
      console.error(error)
    }
  }
  // this will get the feed when the page will load
  useEffect(() => {
    getFeed();
  }, [])

  return (
    feed && (<div className='flex justify-center my-18'>
      <UserCard user = {feed[4]}/>
    </div>)
  )
}

export default Feed