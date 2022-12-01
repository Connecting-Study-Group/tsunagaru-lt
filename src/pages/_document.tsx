import { createGetInitialProps } from '@mantine/next';
import Document, { Head, Html, NextScript } from 'next/document';

const getInitialProps = createGetInitialProps();

export default class _Document extends Document {
  static getInitialProps = getInitialProps;

  render() {
    return (
      <Html>
        <Head />
        <body>
          <NextScript />
        </body>
      </Html>
    );
  }
}
