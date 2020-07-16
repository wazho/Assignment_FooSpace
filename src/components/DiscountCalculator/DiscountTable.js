// Node modules.
import React from "react";
import { Table } from "semantic-ui-react";

const DiscountTable = props => {
  const { productList } = props;

  return (
    <Table celled unstackable>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>ID</Table.HeaderCell>
          <Table.HeaderCell>Name</Table.HeaderCell>
          <Table.HeaderCell>Price</Table.HeaderCell>
          <Table.HeaderCell>New Price</Table.HeaderCell>
          <Table.HeaderCell>Note</Table.HeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {productList.map((product, j) => (
          <Table.Row key={j}>
            <Table.Cell>{product.productID}</Table.Cell>
            <Table.Cell>{product.name}</Table.Cell>
            <Table.Cell textAlign="right">{product.price}</Table.Cell>
            <Table.Cell textAlign="right">{product.updatedPrice}</Table.Cell>
            <Table.Cell>{product.discountDescription}</Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
};

export default DiscountTable;
