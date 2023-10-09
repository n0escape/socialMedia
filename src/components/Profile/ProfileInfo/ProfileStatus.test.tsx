import React from "react";
import ProfileStatus from './ProfileStatus';
import { create } from "react-test-renderer";

describe('Profile Status tests', () => {
	test('status form props should be in state', () => {
		const component = create(<ProfileStatus userStatus="status text" updateUserStatus={ function (userStatus: string): void {} } />);
		const root = component.root;
		let span = root.findByType("span");
		expect(span.children[0]).toBe("status text")
	});
	test('after render span shold be shown', () => {
		const component = create(<ProfileStatus userStatus="status text" updateUserStatus={ function (userStatus: string): void {} } />);
		const root = component.root;
		let span = root.findByType("span");
		expect(span).not.toBeNull()
	});
	test('after render input shouldn`t be shown', () => {
		const component = create(<ProfileStatus userStatus="status text" updateUserStatus={ function (userStatus: string): void {} } />);
		const root = component.root;
		//ожидание комопненты
		expect(()=>{
			let input = root.findByType("input");
		}).toThrow()
	});
	test('after doubleClick on span shold be changed to input whith correct status', () => {
		const component = create(<ProfileStatus userStatus="status text" updateUserStatus={ function (userStatus: string): void {} } />);
		const root = component.root;
		let span = root.findByType("span");
		span.props.onDoubleClick();
		let input = root.findByType("input");
		expect(input.props.value).toBe("status text")
	})
})