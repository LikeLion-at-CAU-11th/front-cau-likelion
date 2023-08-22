import Parser from 'rss-parser';
import { AppDataSource } from '../data-source';
import { Feed } from '../entity/Feed';
import { JSDOM } from 'jsdom';
import { sendFCMNotification } from './sendFCM';

export interface feed {
  writer: string;
  title: string;
  link: string;
  content: string;
  thumbnail: string;
  date: string;
}

interface blogData {
  name: string;
  blog: string;
}
export class FeedService {
  static FeedDAO = AppDataSource.getRepository(Feed);

  static async post(blogList: blogData[]) {
    const result = await getRss(blogList);
    const defaultRss = await FeedService.FeedDAO.find();
    const newItems = getNewItems(defaultRss as unknown as feed[], result);
    if (newItems.length) {
      console.log(newItems);
      const notification = {
        data: {
          title: '새로운 글이 작성되었어요!',
          body: `${newItems[0].writer}${
            newItems.length
              ? `외${newItems.length - 1}명이 글을 작성했어요`
              : `가 글을 작성했어요!`
          }`,
          image:
            'https://blog.cau-likelion.org/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fcau%EC%82%AC%EC%9E%90.0fecfbbb.png&w=3840&q=75',
          click_action: 'open_page',
        },
      };
      await FeedService.FeedDAO.clear();
      const feeds = result.map((posting) => {
        const feed = new Feed();
        feed.content = posting.content;
        feed.date = posting.date;
        feed.link = posting.link;
        feed.thumbnail = posting.thumbnail;
        feed.title = posting.title;
        feed.writer = posting.writer;
        return feed;
      });
      await FeedService.FeedDAO.save(feeds);
      const fcm = await sendFCMNotification(notification);
      console.log(fcm);
      return result;
    } else {
      return result;
    }
  }
}

const getRss = async (blogList: blogData[]) => {
  const parser = new Parser();
  const result = await Promise.all(
    blogList.map(async ({ name, blog }) => {
      const feed = await parser.parseURL(blog);
      const result = feed.items.map((item) => {
        const content = decideContent(item as feed);
        return {
          title: item.title,
          writer: name,
          link: item.link,
          content: removeAdd(content)
            .replace(/<[^>]*>?/g, '')
            .replace(/\n/g, '')
            .replace(/&nbsp/g, '')
            .trim()
            .replace(/\s+/g, ' ')
            .slice(0, 300),
          thumbnail: getThumbnail(content),
          date: item.isoDate,
        };
      });
      return result as unknown as feed[];
    })
  );
  return result
    .flat()
    .sort(
      (a, b) =>
        new Date(b.date as string).getTime() -
        new Date(a.date as string).getTime()
    );
};

const decideContent = (item: feed) => {
  if (item.content) return item.content;
  return item['content:encoded'];
};

const getThumbnail = (content: string) => {
  const regex = /<img\s+src=(?:(['"])(.*?)\1|([^'"\s]+))/g;
  if (content) {
    const result = content.match(regex);
    if (result) return result[0].split(/src=/)[1].split(/\'|\"/)[1];
    return '';
  }
  return '';
};

const removeAdd = (content: string) => {
  if (!content) return '';
  const dom = new JSDOM(content);
  const document = dom.window.document;
  const revenueUnitWraps = document.querySelectorAll('.revenue_unit_wrap');
  revenueUnitWraps.forEach((revenueUnitWrap) => {
    revenueUnitWrap.remove();
  });
  const outputHTML = document.documentElement.outerHTML;
  return outputHTML;
};

const getNewItems = (prev: feed[], current: feed[]) => {
  const newItems: feed[] = [];
  for (const currentItem of current) {
    const existsInPrev = prev.some(
      (prevItem) => prevItem.link === currentItem.link
    );

    if (!existsInPrev) {
      newItems.push(currentItem);
    }
  }

  return newItems;
};
