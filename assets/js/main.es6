---
layout: null
---

class TabBar {
  constructor($diaryTab, $qiitaTab, $diaryList, $qiitaList, $pagination) {
    this.$diaryTab = $diaryTab;
    this.$qiitaTab = $qiitaTab;
    this.$diaryList = $diaryList;
    this.$qiitaList = $qiitaList;
    this.$pagination = $pagination;

    this.$diaryTab.on('click', this.onClickdiaryTab.bind(this));
    this.$qiitaTab.on('click', this.onClickQiitaTab.bind(this));
  }

  onClickdiaryTab() {
    this.select(this.$diaryTab);
    this.hideContents();
    this.$diaryList.show();
    this.$pagination.show();
  }

  onClickQiitaTab() {
    this.select(this.$qiitaTab);
    this.hideContents();
    this.$qiitaList.show();
  }

  select($tab) {
    this.$diaryTab.removeClass('selected');
    this.$qiitaTab.removeClass('selected');
    $tab.addClass('selected');
  }

  hideContents() {
    this.$diaryList.hide();
    this.$qiitaList.hide();
    this.$pagination.hide();
  }
}

class QiitaPostManager {
  static get qiitaUrl() {
    return 'https://qiita.com/api/v1/users/tsugita/items'
  }

  constructor($qiitaList) {
    this.$qiitaList = $qiitaList;

    this.fetchPosts().done(() => {
      this.render();
    });
  }

  render() {
    for (const post of this.posts) {
      this.$qiitaList.append(post.render());
    }
  }

  fetchPosts() {
    let posts = [];
    const deferred = $.Deferred();

    $.getJSON(QiitaPostManager.qiitaUrl)
      .done(function(gotPosts) {
        for (const gotPost of gotPosts) {
          const post = new QiitaPost(gotPost);
          posts.push(post);
        }
        deferred.resolve();
      })
      .fail(function(jqXHR) {
        console.log(jqXHR);
      });

    deferred.done(() => {
      this.posts = posts;
    });

    return deferred;
  }
}

class QiitaPost {
  constructor(post) {
    this.title = post.title;
    this.url = post.url;
    this.tagNamesString = this.tagNamesString(post.tags);
    this.created_at = this.onlyMonthAndDayFormattedString(post.created_at);
  }

  onlyMonthAndDayFormattedString(dateString) {
    const date = new Date(dateString);
    const dateItems = date.toDateString().split(' ');
    const monthString = dateItems[1];
    const dayString = dateItems[2];
    return `${monthString} ${dayString}`;
  }

  tagNamesString(tags) {
    let tagNames = [];

    for (const tag of tags) {
      tagNames.push(tag.name);
    }

    return tagNames.join(', ')
  }

  render() {
    return `
      <li>
          <aside class="dates">${this.created_at}</aside>
          <a href="${this.url}">${this.title}<h2>${this.tagNamesString}</h2></a>
      </li>
    `;
  }
}
