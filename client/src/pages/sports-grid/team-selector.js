'use client'

import React from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

export default function TeamSelector() {
  return (
    <div className="team-selector">
        <DropdownButton id="dropdown-basic-button" title="Dropdown button">
            <Dropdown.Item>Action</Dropdown.Item>
            <Dropdown.Item>Another action</Dropdown.Item>
            <Dropdown.Item>Something else</Dropdown.Item>
        </DropdownButton>
    </div>
  );
}