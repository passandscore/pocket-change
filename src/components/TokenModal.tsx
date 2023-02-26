import { Avatar, Table, Group, Text, Modal, Flex, Box } from "@mantine/core";
import { BalanceDetails } from "@/data-schema/BalanceDetails";
import { ETH, MATIC, BNB, AVAX, FTM, CRO } from "@/crypto-icons";
import { useEnsAvatar } from "wagmi";
import { useViewportSize } from "@mantine/hooks";
import { BREAKPOINT } from "@/constants";

const iconDiameter = "35";
const icons = [
  ETH(iconDiameter, iconDiameter),
  MATIC(iconDiameter, iconDiameter),
  BNB(iconDiameter, iconDiameter),
  AVAX(iconDiameter, iconDiameter),
  FTM(iconDiameter, iconDiameter),
  CRO(iconDiameter, iconDiameter),
];

export const TokenModal = ({
  openTokenModal,
  balanceDetails,
  address,
  OnModalClose,
}: {
  openTokenModal: boolean;
  balanceDetails: BalanceDetails[];
  address: any;
  OnModalClose: () => void;
}) => {
  const { data } = useEnsAvatar({
    address: `0x${address?.slice(2)}`,
  });
  const { width } = useViewportSize();

  const rows = balanceDetails?.map((item, index) => (
    <tr key={`${item.network}-${index}`}>
      <td>
        <Text size="sm" weight={500}>
          {icons[index]}
        </Text>
      </td>

      <td>
        <Text size="sm" color="dimmed">
          {item?.tokenPrice?.usdPrice?.toLocaleString()}
        </Text>
      </td>

      <td>
        <Flex direction="column">
          <Text size="sm" color="dimmed">
            {`$${(
              item?.balance * item?.tokenPrice?.usdPrice
            ).toLocaleString()}`}
          </Text>
          <Text size="sm" color="dimmed">
            {`${item?.balance.toFixed(3)} ${
              item?.tokenPrice?.nativePrice?.symbol
            }`}
          </Text>
        </Flex>
      </td>
    </tr>
  ));

  return (
    <>
      <Modal
        opened={openTokenModal}
        onClose={OnModalClose}
        centered
        size="xl"
        style={{ borderColor: "white" }}
        overlayColor="rgba(0, 0, 0, 0.5)"
      >
        {/* Wallet Details */}
        {width > BREAKPOINT && (
          <Flex
            justify="center"
            mb={20}
            style={{
              borderBottom: "1px solid #eaeaea",
              paddingBottom: 20,
            }}
          >
            <Group position="center">
              <Avatar
                src={data}
                size="lg"
                radius="xl"
                style={{ marginRight: 20 }}
              />
              <Flex direction="column">
                <Text size="lg" weight={700} color="#489379">
                  Wallet
                </Text>
                <Text size="sm" color="dimmed" weight={600}>
                  {address}
                </Text>
              </Flex>
            </Group>
          </Flex>
        )}

        {/* Grand Total */}
        <Flex justify="center" mb={20}>
          <Group position="center">
            <Flex direction="column" align="center">
              <Text
                variant="gradient"
                gradient={{ from: "#f9d80d", to: "#fe7b17", deg: 45 }}
                sx={{ fontFamily: "Greycliff CF, sans-serif" }}
                ta="center"
                // fz="xl"
                fw={700}
                style={{ fontSize: 30 }}
              >
                Total Pocket Change
              </Text>
              <Text size="xl" color="dimmed">
                {`$${balanceDetails

                  ?.reduce(
                    (acc, item) =>
                      acc + item?.balance * item?.tokenPrice?.usdPrice,
                    0
                  )
                  .toLocaleString()}`}
              </Text>
            </Flex>
          </Group>
        </Flex>

        <Table verticalSpacing="xs" highlightOnHover striped>
          <thead>
            <tr>
              <th>Asset</th>
              <th>Asset Price</th>
              <th>Balance</th>
            </tr>
          </thead>
          <tbody>{rows}</tbody>
        </Table>
      </Modal>
    </>
  );
};
