import React from 'react';
import S from '@sanity/desk-tool/structure-builder';

const createSidebar = () =>
  S.list()
    .title(`Slick's Slices`)
    .items([
      S.listItem()
        .title('Home page')
        .icon(() => <strong>🔥</strong>)
        .child(S.editor().schemaType('storeSettings').documentId('main-store')),
      ...S.documentTypeListItems().filter(
        (item) => item.getId() !== 'storeSettings'
      ),
    ]);

export default createSidebar;
