import React, { useEffect } from 'react';
import { NextPage } from 'next';
import { SEO } from 'components/seo';
import { useRouter } from 'next/router';
import ProductDetails from 'containers/ProductDetails/ProductDetails';
import { Modal } from '@redq/reuse-modal';
import ProductSingleWrapper, {
  ProductSingleContainer,
} from 'styled/product-single.style';
import CartPopUp from 'containers/Cart/CartPopUp';
import useApi from '../../hooks/useApi';

type Props = {
  deviceType?: {
    mobile: boolean;
    tablet: boolean;
    desktop: boolean;
  };
};

const ProductPage: NextPage<Props> = ({ deviceType }) => {
  const {
    query: { slug },
  } = useRouter();

  const [{response, loading, error}, getProduct] = useApi<any, any>({path: `/products/${slug}` });

  useEffect(() => {
    getProduct();
  }, [slug])

  if (loading) {
    return <div>loading...</div>;
  }

  if (error) return <div>Error: {error.response.data.message}</div>;

  let content;
  if (response) {
    content = <ProductDetails product={response.data} deviceType={deviceType} />;
  }

  return (
    <>
      { response && (
        <SEO
          title={`${response.data.name} - PickBazar`}
          description={`${response.data.name} Details`}
        />
      )}
      

      <Modal>
        <ProductSingleWrapper>
          <ProductSingleContainer>
            {content}
            <CartPopUp deviceType={deviceType} />
          </ProductSingleContainer>
        </ProductSingleWrapper>
      </Modal>
    </>
  );
};
export default ProductPage;
