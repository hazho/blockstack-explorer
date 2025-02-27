import React from 'react';
import { List } from '@components/list/index';
import { Box } from 'blockstack-ui';
import { Consumer } from '@pages/_app';
import { Time } from '@components/time';

const TxList = ({ transactions, ...rest }) => (
  <Consumer>
    {({ transactions: contextTransactions }) => {
      const txList = transactions || contextTransactions;
      if (!txList) return null;
      return txList
        .sort((a, b) => new Date(a.time * 1000) < new Date(b.time * 1000))
        .map(({ txid, valueOut, time, action, value }) => (
          <List.Item
            href={{
              pathname: '/transaction/single',
              query: {
                tx: txid,
              },
            }}
            as={`/tx/${txid}`}
            key={txid}
          >
            <Box maxWidth="calc(100% - 105px)">
              <List.Item.Title overflow="auto">
                {action && <span>{`${action} `}</span>}
                {`${value || valueOut} BTC`}
              </List.Item.Title>
              <List.Item.Subtitle overflow="auto">{txid}</List.Item.Subtitle>
            </Box>
            {time && (
              <List.Item.Subtitle>
                <Time date={time} />
              </List.Item.Subtitle>
            )}
          </List.Item>
        ));
    }}
  </Consumer>
);

export { TxList };
