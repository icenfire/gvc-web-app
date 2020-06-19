import React from 'react'
import Enzyme, { mount } from 'enzyme'
import EnzymeAdapter from 'enzyme-adapter-react-16'
import { EditNoticePaper } from './EditNoticePaper'
import { INoticeWithMeta } from '../../../types'
import firebase from '../../../firebase/index'
import { useDispatch } from 'react-redux'

Enzyme.configure({
  adapter: new EnzymeAdapter(),
  disableLifecycleMethods: true
})

jest.mock('react-redux', () => ({
  useDispatch: jest.fn()
}))

const mockUseDispatch = useDispatch as jest.Mock
const updateNotice = jest.fn()
const mockDispatch = jest.fn(updateNotice)

describe('<EditNoticePaper />', () => {
  mockUseDispatch.mockReturnValue(mockDispatch)
  const notice: INoticeWithMeta = {
    content: 'content1',
    createdAt: firebase.firestore.Timestamp.now(),
    id: 'id1',
    title: 'title1'
  }

  const container = mount(<EditNoticePaper notice={notice} />)

  it('should match the snapshot', () => {
    expect(container.html()).toMatchSnapshot()
  })

  test('renders without error', () => {
    expect(
      container.find('[data-testid="component-edit-noticepaper"]').length
    ).toEqual(1)
  })

  it('should have an title field', () => {
    expect(
      container.find('[data-testid="title"] input[type="text"]').length
    ).toEqual(1)
  })

  it('should have an content field', () => {
    expect(
      container.find('[data-testid="content"] textarea').length
    ).toBeGreaterThan(1)
  })

  it('should set the title value on change event', () => {
    container
      .find('[data-testid="title"] input[type="text"]')
      .simulate('change', {
        target: {
          value: 'some new title'
        }
      })

    expect(
      container.find('[data-testid="title"] input[type="text"]').prop('value')
    ).toBe('some new title')
  })

  it('should set the content value on change event', () => {
    container
      .find('[data-testid="content"] textarea')
      .at(0)
      .simulate('change', {
        target: {
          value: 'some new content'
        }
      })

    expect(
      container
        .find('[data-testid="content"] textarea')
        .at(0)
        .prop('value')
    ).toBe('some new content')
  })

  it('should call the add notice function on submit button click', () => {
    container
      .find('[data-testid="title"] input[type="text"]')
      .simulate('change', {
        target: {
          value: 'some new title'
        }
      })
    container
      .find('[data-testid="content"] textarea')
      .at(0)
      .simulate('change', {
        target: {
          value: 'some new content'
        }
      })

    container.find('button[type="button"]').simulate('click')

    expect(mockDispatch).toHaveBeenCalledTimes(1)

    expect(
      container
        .find('[data-testid="content"] textarea')
        .at(0)
        .prop('value')
    ).toBe('')

    expect(
      container.find('[data-testid="title"] input[type="text"]').prop('value')
    ).toBe('')
  })
})
