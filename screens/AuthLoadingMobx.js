import React, { Component } from 'react';
import { Button } from 'react-native';
import styled from 'styled-components/native';
import Store from '../mobx/observableStore';
import { observer, inject } from 'mobx-react';

const ContainerView = styled.View`
  flex: 1;
  justifycontent: center;
  alignitems: center;
  backgroundcolor: ${props => props.theme.facebook};
`;

const TitleText = styled.Text`
  fontsize: 30;
  color: ${props => props.theme.facebook};
`;

@inject('Store')
@observer
class TrainStationsScreen extends Component {
  render() {
    return (
      <ContainerView>
        <TitleText>{this.props.navigation.state.routeName}</TitleText>
        <TitleText>
          DemostrationVariable: {ApplicationState.AppGlobalState.DemostrationVariable.toString()}
        </TitleText>
        <Button
          title={'Toggle Demo Variable'}
          onPress={() => {
            ApplicationState.AppGlobalState.DemostrationVariable = !ApplicationState.AppGlobalState
              .DemostrationVariable;
          }}
        />
      </ContainerView>
    );
  }
}

export default TrainStationsScreen;
