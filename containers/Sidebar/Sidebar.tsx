import React, { useContext, useEffect } from 'react';
import { useRouter } from 'next/router';
import Sticky from 'react-stickynode';
import { Scrollbars } from 'react-custom-scrollbars';
import Popover from 'components/Popover/Popover';
import { ArrowDropDown, CategoryIcon } from 'components/AllSvgIcon';
import { SearchContext } from 'contexts/search/search.context';
import { useLocale } from 'contexts/language/language.provider';
import { useStickyState } from 'contexts/app/app.provider';
import {
  SidebarMobileLoader,
  SidebarLoader,
} from 'components/Placeholder/Placeholder';
import { FormattedMessage } from 'react-intl';
import {
  CategoryWrapper,
  TreeWrapper,
  PopoverHandler,
  PopoverWrapper,
  SidebarWrapper,
} from './Sidebar.style';

import { TreeMenu } from 'components/TreeMenu/TreeMenu';

import useApi from 'hooks/useApi';

type SidebarCategoryProps = {
  deviceType: {
    mobile: string;
    tablet: string;
    desktop: boolean;
  };
  type: string;
};

const SidebarCategory: React.FC<SidebarCategoryProps> = ({
  deviceType: { mobile, tablet, desktop },
  type,
}) => {
  const { state, dispatch } = useContext(SearchContext);
  const router = useRouter();
  const { pathname, query } = router;

  const [{response, loading, error}, getCategories] = useApi<any, any>({path: "/categories", });

  const selectedQueries = query.category;

  const { isRtl } = useLocale();

  const handleCategorySelection = (slug: string, hasChilds: boolean) => {
    const updatedQuery = state.text
      ? { text: state.text, category: slug, hasChilds}
      : { category: slug, childs: hasChilds};
    router.push({
      pathname: pathname,
      query: updatedQuery,
    });
  };
  const isSidebarSticky = useStickyState('isSidebarSticky');

  useEffect(() => {
    getCategories()
  }, []);

  if (!response || loading) {
    if (mobile || tablet) {
      return <SidebarMobileLoader />;
    }

    return <SidebarLoader />;
  }

  const transform = (categories: any) => {
    const items = []
    for (const c of categories) {
      const cc = [];
      for (const s of c.subcategories) {
        cc.push({title: s.name, slug: s.id});
      }
      items.push({title: c.name, slug: c.id, children: cc});
    }
    return items;
  }

  return (
    <CategoryWrapper>
      <PopoverWrapper>
        <Popover
          handler={
            <PopoverHandler>
              <div>
                <CategoryIcon />
                Select your Category
              </div>
              <div> 
                <ArrowDropDown />
              </div>
            </PopoverHandler>
          }
          className='category-popover'
          content={
            <>
              <TreeMenu
                data={transform(response.data)}
                onClick={handleCategorySelection}
                active={selectedQueries}
              />
            </>
          }
        />
      </PopoverWrapper>

      <SidebarWrapper style={{ paddingTop: 45 }}>
        <Sticky enabled={isSidebarSticky} top={110}>  
          <Scrollbars
            universal
            autoHide
            autoHeight
            autoHeightMax={688}
            renderView={(props) => (
              <div
                {...props}
                style={{
                  ...props.style,
                  marginLeft: isRtl ? props.style.marginRight : 0,
                  marginRight: isRtl ? 0 : props.style.marginRight,
                }}
              />
            )}
          >
            <TreeWrapper>
              <TreeMenu
                data={transform(response.data)}
                onClick={handleCategorySelection}
                active={selectedQueries}
              />
            </TreeWrapper>
          </Scrollbars>
        </Sticky>
      </SidebarWrapper>
    </CategoryWrapper>
  );
};

export default SidebarCategory;
