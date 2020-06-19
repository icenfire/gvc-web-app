import React from 'react'
import Enzyme, { shallow } from 'enzyme'
import EnzymeAdapter from 'enzyme-adapter-react-16'
import { EditNotice } from './EditNotice'

import firebase from '../../firebase/index'

Enzyme.configure({
  adapter: new EnzymeAdapter(),
  disableLifecycleMethods: true
})

describe('<EditNotice /> with undefined', () => {
  const container = shallow(<EditNotice notices={undefined} />)

  it('should match the snapshot', () => {
    expect(container.html()).toMatchSnapshot()
  })

  it('renders without error', () => {
    expect(
      container.find('[data-testid="component-edit-notice"]').length
    ).toEqual(1)
  })

  it('renders instructions to edit without error', () => {
    expect(container.find('[data-testid="edit-loading"]').length).toEqual(1)
  })
})

describe('<EditNotice /> with no props', () => {
  const container = shallow(<EditNotice notices={[]} />)

  it('should match the snapshot', () => {
    expect(container.html()).toMatchSnapshot()
  })

  it('renders without error', () => {
    expect(
      container.find('[data-testid="component-edit-notice"]').length
    ).toEqual(1)
  })

  it('renders instructions to edit without error', () => {
    expect(container.find('[data-testid="edit-instructions"]').length).toEqual(
      1
    )
  })
})

describe('<EditNotice /> with other props', () => {
  const initialProps = {
    notices: [
      {
        content: 'content1',
        createdAt: firebase.firestore.Timestamp.now(),
        id: 'id1',
        title: 'title1'
      },
      {
        content: 'content2',
        createdAt: firebase.firestore.Timestamp.now(),
        id: 'id2',
        title: 'title2'
      },
      {
        content: 'content3',
        createdAt: firebase.firestore.Timestamp.now(),
        id: 'id3',
        title: 'title3'
      }
    ]
  }
  const container = shallow(<EditNotice {...initialProps} />)

  it('should match the snapshot', () => {
    expect(container.html()).toMatchSnapshot()
  })

  it('renders without error', () => {
    expect(
      container.find('[data-testid="component-edit-notice"]').length
    ).toEqual(1)
  })

  it('renders instructions to edit without error', () => {
    expect(container.find('[data-testid="edit-notices"]').length).toEqual(
      initialProps.notices.length
    )
  })
})
