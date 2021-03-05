import React from "react";
import { create } from "react-test-renderer";
import ProfileStatus from "./ProfileStatus";

describe("ProfileStatus component", () => {
    test("status from props should be in the state", () => {
        const component = create(<ProfileStatus status="convalia" />);
        const instance = component.getInstance();
        expect(instance.state.status).toBe("convalia");

    });
    test("after creation <span> should be displayed", () => {
        const component = create(<ProfileStatus status="convalia" />);
        const root = component.root;
        let span = root.findByType("span");
        expect(span).not.toBeNull();
    });
});