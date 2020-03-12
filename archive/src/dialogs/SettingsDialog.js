import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import React from 'react';
import { Icon, CardActions, Divider } from '@material-ui/core';

function SettingsDialog(props) {
  const { setOpenSettingsDialog, openSettingsDialog } = props;

  return (
    <Dialog onClose={()=>{setOpenSettingsDialog(false)}} open={openSettingsDialog} maxWidth="md" fullWidth={true}>
      <DialogTitle id="save-dialog" style={{textAlign:"center"}}>
        <Icon style={{verticalAlign:'middle'}}>
          build
        </Icon>
        <span style={{fontsize:38,fontWeight:"bold"}}>
          Settings
        </span>
      </DialogTitle>
      <Divider/>
      <CardActions style={{justifyContent: 'center'}}>
        <div style={{padding:"2%"}}>
          <a target="_blank" href="https://eth.build">Eth.Build</a> (<a target="_blank" href="https://github.com/austintgriffith/eth.build">source</a>) created by <a target="_blank" href="https://twitter.com/austingriffith">Austin Griffith</a>
        </div>
      </CardActions>
      <CardActions style={{justifyContent: 'center'}}>
        <div style={{padding:"2%"}}>
          With support from <a target="_blank" href="https://ethereum.org">the Ethereum Foundation</a>, <a target="_blank" href="https://consensys.net/">Consensys</a>, and <a target="_blank" href="https://gitcoin.co/grants/122/austin-griffith-ethereum-rampd">Gitcoin Grants</a>
      </div>
    </CardActions>
    <CardActions style={{justifyContent: 'center'}}>
      <div style={{padding:"2%"}}>
        Special thanks to <a target="_blank" href="https://github.com/jagenjo">Javi Agenjo</a> for <a target="_blank" href="https://github.com/jagenjo/litegraph.js">litegraph</a>
    </div>
  </CardActions>
</Dialog>
)
}

export default SettingsDialog;
