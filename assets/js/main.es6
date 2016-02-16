---
layout: null
---

class TabBar {
  constructor($postTab, $qiitaTab, $postList, $qiitaList, $pagination) {
    this.$postTab = $postTab;
    this.$qiitaTab = $qiitaTab;
    this.$postList = $postList;
    this.$qiitaList = $qiitaList;
    this.$pagination = $pagination;

    this.$postTab.on('click', this.onClickPostTab.bind(this));
    this.$qiitaTab.on('click', this.onClickQiitaTab.bind(this));
  }

  onClickPostTab() {
    this.select(this.$postTab);
    this.hideContents();
    this.$postList.show();
    this.$pagination.show();
  }

  onClickQiitaTab() {
    this.select(this.$qiitaTab);
    this.hideContents();
    this.$qiitaList.show();
  }

  select($tab) {
    this.$postTab.removeClass('selected');
    this.$qiitaTab.removeClass('selected');
    $tab.addClass('selected');
  }

  hideContents() {
    this.$postList.hide();
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
    this.created_at = this.onlyMonthAndDayFormattedString(post.created_at);
  }

  onlyMonthAndDayFormattedString(dateString) {
    const date = new Date(dateString);
    const dateItems = date.toDateString().split(' ');
    const monthString = dateItems[1];
    const dayString = dateItems[2];
    return `${monthString} ${dayString}`;
  }

  render() {
    return `
      <li>
          <a href="${this.url}"><aside class="dates">${this.created_at}</aside></a>
          <a href="${this.url}">${this.title}</a>
      </li>
    `;
  }
}
