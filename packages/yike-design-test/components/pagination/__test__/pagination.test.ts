import { mount } from '@vue/test-utils';
import YkPagination from '../../../../yike-design-ui/src/components/pagination/src/pagination.vue';
import YkPaginationPager from '../../../../yike-design-ui/src/components/pagination/src/components/pagination-pager/pagination-pager.vue';
import YkPaginationJumber from '../../../../yike-design-ui/src/components/pagination/src/components/pagination-jumper/pagination-jumper.vue';
import YkPaginationTotal from '../../../../yike-design-ui/src/components/pagination/src/components/pagination-total/pagination-total.vue';

describe('Pagination', () => {
  it('mount', () => {
    const pagination = mount(YkPagination, {
      props: {
        total: 2001,
      },
    });
    expect(pagination.classes()).toContain('yk-pagination');
  });

  it('disabled', () => {
    const pagination = mount(YkPagination, {
      props: {
        disabled: true,
        total: 2000,
      },
    });
    expect(pagination.classes()).toContain('yk-pagination--disabled');
  });

  it('simple', () => {
    const pagination = mount(YkPagination, {
      props: {
        simple: true,
        showJumper: true,
        total: 2000,
      },
    });
    expect(
      pagination
        .findComponent(YkPaginationPager)
        .findAll('.yk-pagination-pager__item').length,
    ).toBe(2);
    expect(pagination.findAllComponents(YkPaginationPager).length).toBe(1);
  });

  it('pager-count', () => {
    const pagerCount = 10;
    const pagination = mount(YkPagination, {
      props: {
        total: 2000,
        pagerCount,
      },
    });
    expect(
      pagination
        .findComponent(YkPaginationPager)
        .findAll('.yk-pagination-pager__item-number').length,
    ).toBe(pagerCount);
  });

  it('show-jumper', () => {
    const pagination = mount(YkPagination, {
      props: {
        total: 1000,
        showJumper: true,
      },
    });
    expect(pagination.findComponent(YkPaginationJumber).exists()).toBe(true);
  });

  it('show-total', () => {
    const pagination = mount(YkPagination, {
      props: {
        total: 1000,
        showTotal: true,
      },
    });
    expect(pagination.findComponent(YkPaginationTotal).exists()).toBe(true);
  });

  it('defferent-size', () => {
    const pagination = mount(YkPagination, {
      props: {
        total: 1000,
      },
    });

    pagination.setProps({ size: 's' }).then(() => {
      expect(pagination.classes()).toContain(`yk-pagination--s`);
    });
  });
});
