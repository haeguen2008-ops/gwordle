import { expect } from 'chai'
import { matchWord } from '@/matcher'

describe('@/matcher', () => {
  it('properly processes exact match', () => {
    expect(matchWord('crane', 'crane')).to.eql([
      'exact', 'exact', 'exact', 'exact', 'exact'
    ])
  })

  it('throws on invalid (non-same-length) query', () => {
    expect(() => matchWord('crane', 'zzzzzz')).to.throw()
  })

  it('properly processes no match', () => {
    expect(matchWord('crane', 'zzzzz')).to.eql([
      'none', 'none', 'none', 'none', 'none'
    ])
  })

  it('processes misplaced', () => {
    expect(matchWord('ayyyy', 'zzzaz')).to.eql([
      'misplaced', 'none', 'none', 'none', 'none'
    ])
  })

  it('processes misplaced - duplicate answer characters', () => {
    expect(matchWord('ayyyy', 'zzaaz')).to.eql([
      'misplaced', 'none', 'none', 'none', 'none'
    ])
  })

  it('processes misplaced - duplicate query characters', () => {
    expect(matchWord('aayyy', 'zzazz')).to.eql([
      'misplaced', 'none', 'none', 'none', 'none'
    ])
  })

  it('processes misplaced - duplicate query & answer characters', () => {
    expect(matchWord('aayay', 'zzaza')).to.eql([
      'misplaced', 'misplaced', 'none', 'none', 'none'
    ])
  })
})
