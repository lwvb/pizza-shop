import { Link } from 'gatsby';
import React from 'react';
import styled from 'styled-components';

interface Props {
  totalCount: number;
  currentPage: number;
  limit?: number;
  base: string;
}

const PaginationStyles = styled.div`
  display: flex;
  border-radius: 5px;
  margin: 2rem 0;
  align-content: center;
  align-items: center;
  justify-content: center;
  text-align: center;
  & > * {
    padding: 0 2rem;
    border-right: 1px solid var(--grey);
    text-decoration: none;
    &[aria-current],
    &.current {
      color: var(--red);
    }
    &.disabled {
      pointer-events: none;
      cursor: initial;
      color: var(--grey);
    }
    &:last-child {
      border-right: none;
    }
  }
`;

const Pagination: React.FC<Props> = ({ totalCount, currentPage = 1, limit, base }) => {
  const realLimit = limit || parseInt(process.env.GATSBY_PAGE_SIZE || '4');
  const totalPages = Math.ceil(totalCount / realLimit);
  const hasPrevious = currentPage > 1;
  const hasNext = currentPage < totalPages;

  return (
    <PaginationStyles>
      <Link className={hasPrevious ? '' : 'disabled'} to={`/${base}/${currentPage - 1}`}>Previous</Link>
      {Array.from({ length: totalPages }).map((_, i) => (
        <Link className={i === currentPage - 1 ? 'current' : ''} to={`/${base}/${i + 1}`} key={i}>{i + 1}</Link>
      ))}
      <Link className={hasNext ? '' : 'disabled'} to={`/${base}/${currentPage + 1}`}>Next</Link>
    </PaginationStyles>
  );
}

export default Pagination;